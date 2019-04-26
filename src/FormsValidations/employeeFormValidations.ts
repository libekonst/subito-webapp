import { IEmployee } from '../interfaces';
import { IEmployeeErrors } from '../interfaces/IEmployeeErrors';

const isNumeric = /^\d+$/;

const getEmptyErrors = (): IEmployeeErrors => ({
  name: '',
  vat: '',
  workStart: '',
  workFinish: '',
});
export default function validateOnChange(values: IEmployee) {
  let errors: IEmployeeErrors = getEmptyErrors();
  if (!isNumeric.test(values.vat)) errors.vat = 'Ο Αφμ αποταιλείται μόνο απο αριθμούς.';
  if (!values.vat) errors.vat = '';
  return errors;
}
export const shouldType = (value: string, valueName: string) =>
  valueName === 'vat' && value.length > 9 ? false : true;

export function validateOnSubmit(values: IEmployee) {
  let errors: IEmployeeErrors = getEmptyErrors();
  if (!isNumeric.test(values.vat)) errors.vat = 'Ο Αφμ αποταιλείται μόνο απο αριθμούς.';
  if (!values.vat) errors.vat = 'Προσθέστε ΑΦΜ.';
  if (values.vat && values.vat.length !== 9)
    errors.vat = 'Ο Αφμ αποταιλείται απο 9 αριθμούς.';
  if (!values.name) errors.name = 'Προσθέστε ονοματεπώνυμο.';
  if (values.name && values.name.length > 255)
    errors.name = 'Προσθέστε λιγότερους χαρακτήρες';
  return errors;
}
