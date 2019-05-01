import React, { FC, useState, useEffect } from 'react';

import { addHours, setHours, setMinutes } from 'date-fns';
import validateOnChange, { validateOnSubmit } from './validation';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';
import EmployeeFormView from './EmployeeFormView';
import { withRouter, RouteComponentProps } from 'react-router';
import db from '../../db/db';
import { IEmployee } from '../../interfaces';

interface IMatchParams {
  employeeID?: string;
}

const EmployeeForm: FC<RouteComponentProps<IMatchParams>> = props => {
  const date: Date = setMinutes(setHours(new Date(), 8), 0);
  const [employee, setEmployee] = useState<IEmployee | undefined>();

  const [errors, setErrors] = useState<IEmployeeErrors>({
    name: '',
    vat: '',
    workStart: '',
    workFinish: '',
  });
  const [values, setValues] = useState({ name: '', vat: '' });
  const [workStart, setWorkStart] = useState(employee ? employee.workStart : date);
  const [workFinish, setWorkFinish] = useState(
    employee ? employee.workFinish : addHours(date, 8),
  );

  useEffect(() => {
    async function fetchEmployee() {
      const { employeeID } = props.match.params;
      let employee;
      try {
        if (employeeID) employee = await db.employee.get(parseInt(employeeID, 10));
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
      setEmployee(employee);
      setValues(
        employee ? { name: employee.name, vat: employee.vat } : { name: '', vat: '' },
      );
      setWorkStart(employee ? employee.workStart : date);
      setWorkFinish(employee ? employee.workFinish : addHours(date, 8));
    }
    fetchEmployee();
  }, []);
  const handleSubmit = async (event: any) => {
    if (event) event.preventDefault();
    const theErrors = validateOnSubmit(values);

    setErrors(theErrors);

    // If errors, prevent submition.
    if (!!Object.values(theErrors).reduce((acc, val) => acc + val, '')) return;

    try {
      await db.employee.put({ ...employee, ...values, workStart, workFinish });
      return props.history.goBack();
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleChange = (valueName: string) => (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (valueName === 'vat' && event.target.value.length > 9) return;
    const currentValues = { ...values, [valueName]: event.target.value };
    const currentErrors = validateOnChange(currentValues);
    setValues(currentValues);
    setErrors(currentErrors);
  };

  return (
    <EmployeeFormView
      employee={employee}
      {...props}
      {...{
        errors,
        values,
        workStart,
        workFinish,
        setWorkStart,
        setWorkFinish,
        handleChange,
        handleSubmit,
      }}
    />
  );
};

export default withRouter(EmployeeForm);
