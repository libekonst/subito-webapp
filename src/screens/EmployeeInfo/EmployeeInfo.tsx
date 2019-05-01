import React, { FC, useEffect, useState } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms, IEmployee } from '../../interfaces';
import { Redirect, withRouter, RouteComponentProps } from 'react-router';
import { EmployeeInfoToolbar, AppBar } from '../../components/AppShell';
import db from '../../db/db';

interface IMatchParams {
  employeeID?: string;
}

const EmployeeInfo: FC<RouteComponentProps<IMatchParams>> = props => {
  const { match, history } = props;

  const [employee, setEmployee] = useState<IEmployee | undefined>();

  useEffect(() => {
    async function fetchEmployee() {
      const { employeeID } = match.params;
      let employee;
      try {
        if (employeeID) employee = await db.employee.get(parseInt(employeeID, 10));
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
      setEmployee(employee);
    }
    fetchEmployee();
  }, []);

  const smsFactory = () => ({
    employee: {
      name: employee ? employee.name : 'No employee found',
      vat: '104957382',
      workStart: new Date(),
      workFinish: new Date(),
    },
    overtimeStart: new Date(),
    overtimeFinish: new Date(),
    dateSent: new Date(),
    approved: Math.random() >= 0.3,
  });

  const list: IE8Sms[] = Array(30)
    .fill(0)
    .map(smsFactory);

  const handleDelete = async (event: any) => {
    if (!employee) return;

    const { employeeID } = props.match.params;
    if (!employeeID) return;

    try {
      db.employee.delete(parseInt(employeeID, 10));
      return props.history.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {employee && (
        <AppBar>
          <EmployeeInfoToolbar onGoBack={history.goBack} employee={employee} onDelete={handleDelete} />
        </AppBar>
      )}
      <SmsList smsList={list} />
    </>
  );
};

export default EmployeeInfo;
