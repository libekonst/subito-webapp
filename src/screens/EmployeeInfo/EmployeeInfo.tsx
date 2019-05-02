import React, { FC, useEffect, useState } from 'react';
import SmsList from '../../components/SmsList';
import { IE8Sms, IEmployee } from '../../interfaces';
import { RouteComponentProps } from 'react-router';
import { EmployeeInfoToolbar, AppBar } from '../../components/AppShell';
import db from '../../db/db';
import Fade from '@material-ui/core/Fade';
import exportToCsv from '../../utils/exportToCSV';
import { Fab } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
interface IMatchParams {
  employeeID?: string;
}

const EmployeeInfo: FC<RouteComponentProps<IMatchParams>> = props => {
  const { match, history } = props;

  const [smsList, setSmsList] = useState<IE8Sms[]>([]);
  const [employee, setEmployee] = useState<IEmployee | undefined>();

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
      // setIsLoading(false);
      setEmployee(employee);
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
    exportToCsv(smsList, { filename: `${employee!.name} μηνύματα Εργάνη` });
  return (
    <>
      {employee && (
        <AppBar>
          <EmployeeInfoToolbar
            onGoBack={history.goBack}
            employee={employee}
            onDelete={handleDelete}
          />
        </AppBar>
      )}
      <Fade in={true}>
        <div>
          <SmsList smsList={smsList} />
          <Fab
            onClick={handleExportCSV}
            color="primary"
            aria-label="csv"
            /* className={classes.fab} */
            style={{ position: 'fixed', bottom: 0, right: 0, margin: 16 }}
          >
            <SaveIcon />
          </Fab>
        </div>
      </Fade>
    </>
  );
};

export default EmployeeInfo;
