import { IEmployee } from './IEmployee';

export interface IE8Sms {
  employee: IEmployee;
  overtimeStart: Date;
  overtimeFinish: Date;
  dateSent: Date;
  approved: boolean;
}
