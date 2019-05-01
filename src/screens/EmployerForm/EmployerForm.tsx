import React, { FC, useState, ChangeEvent, useEffect } from 'react';
import { IEmployer, IEmployerErrors } from '../../interfaces';
import { isNumeric, validateInput } from './validation';
import View from './View';
import dexieDb from '../../db/db';

interface IProps {}
const EmployerForm: FC<IProps> = () => {
  const [values, setValues] = useState<IEmployer>({
    name: '',
    vat: '',
    ame: '',
    smsNumber: '',
  });

  useEffect(() => {
    async function fetchEmployer() {
      const employer = await dexieDb.employer.toCollection().last();
      if (!employer) return;
      setValues(employer);
    }
    fetchEmployer();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateInput(values);

    // Display error messages, if any.
    setErrors(validationErrors);

    // If validationErrors contains any errors, prevent submition
    if (!!Object.values(validationErrors).reduce((acc, val) => acc + val,''))
      return console.log(validationErrors);

    // Submit
    try {
      return await dexieDb.employer.put(values);
    } catch (error) {
      return console.log(error);
    }
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
