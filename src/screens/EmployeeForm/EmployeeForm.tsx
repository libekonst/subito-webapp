import React, { FC, useState } from 'react';

import { addHours, setHours, setMinutes } from 'date-fns';
import validateOnChange, {
  validateOnSubmit,
} from '../../FormsValidations/employeeFormValidations';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';
import EmployeeFormView from './EmployeeFormView';
import { withRouter, RouteComponentProps } from 'react-router';

interface IProps {
  addToState: (employee: any) => void;
}

const EmployeeForm: FC<IProps & RouteComponentProps> = props => {
  const date: Date = setMinutes(setHours(new Date(), 8), 0);

  const [errors, setErrors] = useState<IEmployeeErrors>({
    name: '',
    vat: '',
    workStart: '',
    workFinish: '',
  });
  const [values, setValues] = useState({ name: '', vat: '' });
  const [workStart, setWorkStart] = useState(date);
  const [workFinish, setWorkFinish] = useState(addHours(date, 8));

  const handleSubmit = (event: any) => {
    if (event) event.preventDefault();
    const theErrors = validateOnSubmit(values);

    setErrors(theErrors);

    if (!!Object.values(theErrors).reduce((acc, val) => acc + val)) return;

    console.log({ ...values, workStart, workFinish });
    props.history.goBack();
    return props.addToState({ ...values, workStart, workFinish });
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
