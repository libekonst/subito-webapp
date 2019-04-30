import Dexie from 'dexie';
import { IEmployer, IEmployee, IE8Sms } from '../interfaces';
class LocalDb extends Dexie {
  employer: Dexie.Table<IEmployer, number>;
  employee: Dexie.Table<IEmployee, number>;
  sms: Dexie.Table<IE8Sms, number>;

  constructor() {
    super('LocalDb');
    this.version(1).stores({
      employer: '++id, name, vat',
      employee: '++id, name, vat',
      sms: 'id++, employee, dateSent',
    });

    this.employer = this.table('employer');
    this.employee = this.table('employee');
    this.sms = this.table('sms');
  }
}

const db = new LocalDb();
export default db;
