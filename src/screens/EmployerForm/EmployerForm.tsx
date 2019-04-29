import React, { FC, useState, ChangeEvent } from 'react';
import { IEmployer, IEmployerErrors } from '../../interfaces';
import { isNumeric, validateInput } from './validation';
import View from './View';

interface IProps {}
const EmployerForm: FC<IProps> = () => {
  const [values, setValues] = useState<IEmployer>({
    name: '',
    vat: '',
    ame: '',
    smsNumber: '',
  });
  const [errors, setErrors] = useState<IEmployerErrors>({});

  const handleChange = (val: keyof IEmployer) => (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Clear a field's error when the user starts typing in it. 
    const clearedErrors = { ...errors, [val]: undefined };
    setErrors(clearedErrors);

    // Input guard.
    switch (val) {
      case 'vat':
        if (!isNumeric.test(value) && value !== '') return;
        if (value.length > 9) return;
        break;
      case 'smsNumber':
      case 'ame':
        if (!isNumeric.test(value) && value !== '') return;
        if (value.length > 10) return;
        break;
      case 'name':
        if (value.length > 255) return;
        break;
      default:
        break;
    }

    const newValues = { ...values, [val]: value };
    setValues(newValues);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateInput(values);

    // Display error messages, if any.
    setErrors(validationErrors);

    // If validationErrors contains any errors, prevent submition
    if (Object.values(validationErrors).reduce((acc, val) => acc && val, true))
      return console.log(validationErrors);

    // Submit
    return console.log(values);
  };

  return (
    <View
      onChange={handleChange}
      onSubmit={handleSubmit}
      values={values}
      errors={errors}
    />
  );
};

export default EmployerForm;
