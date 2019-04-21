import React, { FC } from 'react';
import { DeadEndToolbar, FormToolbar } from './Toolbars';
import { routes } from '../../routes';
import EmployeeInfoToolbar from './Toolbars/EmployeeInfoToolbar';
import HomeToolbar from './Toolbars/HomeToolbar';

interface IProps {
  location: any;
  history: any;
  onOpenDrawer?: (e: any) => void;
}
const Toolbar: FC<IProps> = props => {
  const { location, history, onOpenDrawer } = props;
  switch (location.pathname) {
    case routes.SMS_LOG:
      return (
        <DeadEndToolbar pageTitle="Λίστα Sms" onGoBack={history && history.goBack} />
      );
    case routes.EMPLOYER_FORM:
      return <FormToolbar onCancel={history && history.goBack} pageTitle="Ρυθμίσεις" />;
    case routes.EMPLOYEE_INFO:
      return (
        <EmployeeInfoToolbar
          onGoBack={history && history.goBack}
          employeeName="Γιάννης Χιονίδης"
          initials="ΓΧ"
          vatNumber="293845928"
          workHours="08:00 - 16:00"
        />
      );
    case routes.EMPLOYEE_FORM:
      return (
        <FormToolbar
          pageTitle="Δημιουργία υπαλλήλου"
          onCancel={history && history.goBack}
        />
      );
    case routes.E8FORM:
      return (
        <DeadEndToolbar pageTitle="Έντυπο Ε8" onGoBack={history && history.goBack} />
      );
    default:
      return <HomeToolbar onOpenDrawer={onOpenDrawer} pageTitle="Υπάλληλοι" />;
  }
};

export default Toolbar; 