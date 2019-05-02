import { format } from 'date-fns';
import { IE8Sms } from '../interfaces';
import { ExportToCsv } from 'export-to-csv';

export default function exportToCsv(smsList: IE8Sms[]) {
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

  const options = {
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true,
    showTitle: true,
    title: 'Μηνύματα Εργάνη',
    filename: 'Μηνύματα Εργάνη',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
  };
  const csvExporter = new ExportToCsv(options);

  csvExporter.generateCsv(data);
}
