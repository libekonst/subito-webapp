import { format } from 'date-fns';
import { IE8Sms, IEmployee } from '../interfaces';
import { ExportToCsv, Options } from 'export-to-csv';

export default function exportToCsvSmsList(
  smsList: IE8Sms[],
  options?: Partial<Options>,
) {
  if (smsList.length === 0) return;
  const defaultOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: false,
    title: 'Μηνύματα Εργάνη',
    filename: 'Μηνύματα Εργάνη',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const data = smsList.map(sms => {
    return {
      Υπάλληλος: sms.employee.name,
      ΑΦΜ: sms.employee.vat,
      'Έναρξη υπερωρίας': format(sms.overtimeStart, 'HH:mm'),
      'Λήξη υπερωρίας': format(sms.overtimeFinish, 'HH:mm'),
      'Ημερομηνία αποστολής': format(sms.dateSent, 'dd/MM/yyyy HH:mm'),
      'Δεκτή απο Εργάνη': sms.approved ? 'ΝΑΙ' : 'ΟΧΙ',
    };
  });

  const csvExporter = new ExportToCsv({ ...defaultOptions, ...options });

  csvExporter.generateCsv(data);
}
export function exportToCsvEmployees(
  employeeList: IEmployee[],
  options?: Partial<Options>,
) {
  if (employeeList.length === 0) return;
  const defaultOptions = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Υπάλληλοι',
    filename: 'Υπάλληλοι',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const data = employeeList.map(employee => {
    return {
      Όνοματεπώνυμο: employee.name,
      ΑΦΜ: employee.vat,
      'Έναρξη εργασίας': format(employee.workStart, 'HH:mm'),
      'Λήξη εργασίας': format(employee.workFinish, 'HH:mm'),
    };
  });

  const csvExporter = new ExportToCsv({ ...defaultOptions, ...options });

  csvExporter.generateCsv(data);
}
