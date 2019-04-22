import React, { FC } from 'react';
import { DeadEndToolbar, FormToolbar } from './Toolbars';
import { routes } from '../../routes';
import EmployeeInfoToolbar from './Toolbars/EmployeeInfoToolbar';
import HomeToolbar from './Toolbars/HomeToolbar';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router';

interface IProps {
  onOpenDrawer?: (e: any) => void;
}
const Toolbar: FC<RouteComponentProps & IProps> = props => {
  const { location, history, match, onOpenDrawer } = props;
  const SmsLogToolbar = () => (
    <DeadEndToolbar pageTitle="Λίστα Sms" onGoBack={history.goBack} />
  );
  const EmployerFormToolbar = () => (
    <FormToolbar onCancel={history.goBack} pageTitle="Ρυθμίσεις" />
  );
  const EmployeeFormToolbar = () => (
    <FormToolbar pageTitle="Δημιουργία υπαλλήλου" onCancel={history.goBack} />
  );
  const EmployeeListToolbar = () => (
    <HomeToolbar onOpenDrawer={onOpenDrawer} pageTitle="Υπάλληλοι" />
  );
  const E8Toolbar = () => (
    <DeadEndToolbar pageTitle="Έντυπο Ε8" onGoBack={history.goBack} />
  );

  return (
    <>
      <div>You are now at {location.pathname}</div>
      <Switch>
        <Route path={routes.SMS_LOG} render={SmsLogToolbar} />
        <Route path={routes.EMPLOYER_FORM} render={EmployerFormToolbar} />
        <Route path={routes.EMPLOYEE_FORM} render={EmployeeFormToolbar} />
        <Route path={routes.EMPLOYEE_LIST} render={EmployeeListToolbar} />
        <Route path={routes.E8FORM} render={E8Toolbar} />
      </Switch>
    </>
  );

  // TODO
  switch (location.pathname) {
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
  }
};

export default withRouter(Toolbar);
