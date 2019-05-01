import React, { FC, useState } from 'react';

import { addHours, setHours, setMinutes } from 'date-fns';
import validateOnChange, { validateOnSubmit } from './validation';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';
import EmployeeFormView from './EmployeeFormView';
import { withRouter, RouteComponentProps } from 'react-router';
import db from '../../db/db';
import { IEmployee } from '../../interfaces';

interface IProps {
  updateState: () => void;
  employee?: IEmployee;
}

const EmployeeForm: FC<IProps & RouteComponentProps> = props => {
  const date: Date = setMinutes(setHours(new Date(), 8), 0);
  const { employee } = props;
  const [errors, setErrors] = useState<IEmployeeErrors>({
    name: '',
    vat: '',
    workStart: '',
    workFinish: '',
  });
  const [values, setValues] = useState(
    employee ? { name: employee.name, vat: employee.vat } : { name: '', vat: '' },
  );
  const [workStart, setWorkStart] = useState(employee ? employee.workStart : date);
  const [workFinish, setWorkFinish] = useState(
    employee ? employee.workFinish : addHours(date, 8),
  );

  const handleSubmit = async (event: any) => {
    if (event) event.preventDefault();
    const theErrors = validateOnSubmit(values);

    setErrors(theErrors);

    // If errors, prevent submition.
    if (!!Object.values(theErrors).reduce((acc, val) => acc + val, '')) return;

    try {
      await db.employee.put({ ...employee, ...values, workStart, workFinish });
      props.history.goBack();
      return props.updateState();
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
      employee={props.employee}
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
