import { IEmployerErrors, IEmployer } from '../../interfaces';

export const isNumeric = /^\d+$/;

export function validateInput(formValues: IEmployer) {
  let errors: IEmployerErrors = {};
  const { vat, name, ame, smsNumber } = formValues;

  // vat
  if (!isNumeric.test(vat)) errors.vat = 'Ο ΑΦΜ αποτελείται μόνο απο αριθμούς';
  if (vat && vat.length !== 9) errors.vat = 'Ο ΑΦΜ αποτελείται από 9 αριθμούς';
  if (!vat) errors.vat = 'Προσθέστε ΑΦΜ';

  // ame
  if (ame && !isNumeric.test(ame)) errors.ame = 'Ο ΑΜΕ αποτελείται μόνο απο αριθμούς';
  if (ame && ame.length !== 10) errors.ame = 'Ο ΑΦΜ αποτελείται από 10 αριθμούς';

  // name
  if (name && name.length > 255) errors.name = 'Προσθέστε λιγότερους χαρακτήρες';
  if (!name) errors.name = 'Προσθέστε ονοματεπώνυμο';

  // smsNumber
  if (!isNumeric.test(smsNumber)) errors.smsNumber = 'Εισάγετε μόνο αριθμούς';
  if (smsNumber && smsNumber.length > 10)
  errors.smsNumber = 'Εισάγετε μέχρι 10 αριθμούς';
  if (!smsNumber) errors.smsNumber = 'Προσθέστε αριθμό αποστολής';

  return errors;
}
