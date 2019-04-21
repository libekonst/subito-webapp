import { IEmployee } from './IEmployee';

export interface IE8Sms {
  employee: IEmployee;
  overtimeStart: string;
  overtimeFinish: string;
  dateSent: Date;
  approved: boolean;
}
