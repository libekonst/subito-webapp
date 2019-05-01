import { IEmployee } from './IEmployee';

export interface IE8Sms {
  id?:number;
  employee: IEmployee;
  overtimeStart: Date;
  overtimeFinish: Date;
  dateSent: Date;
  approved: boolean;
}
