import { IEmployee } from './IEmployee';
import { IEmployer } from './IEmployer';

export interface IE8Form {
  employee: IEmployee;
  employer: IEmployer;
  overtimeStart: string;
  overtimeFinish: string;
}
