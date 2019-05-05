import React, { FC, useEffect, useState } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms, IEmployee } from '../../interfaces';
import { RouteComponentProps } from 'react-router';
import { EmployeeInfoToolbar, AppBar } from '../../components/AppShell';
import db from '../../db/db';
import Fade from '@material-ui/core/Fade';
import exportToCsvSmsList from '../../utils/exportToCSV';
import { Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CircularProgress from '@material-ui/core/CircularProgress';
import EmptyList from '../../components/NotFound';
import View from './View';

interface IMatchParams {
  employeeID?: string;
}

const EmployeeInfo: FC<RouteComponentProps<IMatchParams>> = props => {
  const { match, history } = props;

  const [smsList, setSmsList] = useState<IE8Sms[]>([]);
  const [employee, setEmployee] = useState<IEmployee | undefined>();
  const [isFetchingEmployee, setIsFetchingEmployee] = useState(true);
  const [isFetchingSms, setIsFetchingSms] = useState(false);

  // Fetch employee
  useEffect(() => {
    async function fetchEmployee() {
      const { employeeID } = match.params;
      let employee;
      try {
        if (employeeID) employee = await db.employee.get(parseInt(employeeID, 10));
      } catch (error) {
        console.log(error);
      }
      setEmployee(employee);
      setIsFetchingEmployee(false);
      setIsFetchingSms(true);
    }
    fetchEmployee();
  }, []);

  // Fetch employee sms
  useEffect(() => {
    async function fetchSmsList() {
      let smsList: IE8Sms[] = [];
      const { employeeID } = match.params;
      try {
        if (employeeID)
          smsList = await db.sms
            .where('employee.id')
            .equals(parseInt(employeeID))
            .toArray();
      } catch (error) {
        console.log(error);
      }
      setSmsList(smsList);
      setIsFetchingSms(false);
    }
    fetchSmsList();
  }, []);

  // DELETE
  const handleDelete = async () => {
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
  const handleExportCSV = () =>
    exportToCsvSmsList(smsList, { filename: `${employee!.name} μηνύματα Εργάνη` });
  return (
    <View
      onGoBack={history.goBack}
      isFetchingEmployee={isFetchingEmployee}
      isFetchingSms={isFetchingSms}
      employee={employee}
      smsList={smsList}
      handleDelete={handleDelete}
      handleExportCSV={handleExportCSV}
    />
  );
};

export default EmployeeInfo;
