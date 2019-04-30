export interface IEmployer {
  id?:number;
  name: string;
  vat: string;
  ame?: string;
  smsNumber: string;
}
export interface IEmployerErrors {
  name?: string;
  vat?: string;
  ame?: string;
  smsNumber?: string;
}
