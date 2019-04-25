import React, { FC } from 'react';
import { DeadEndToolbar, FormToolbar } from './Toolbars';
import { routes } from '../../routes';
import EmployeeInfoToolbar from './Toolbars/EmployeeInfoToolbar';
import HomeToolbar from './Toolbars/HomeToolbar';
import { withRouter, RouteComponentProps, Route, Switch } from 'react-router';
import { IEmployee } from '../../interfaces';
import { toUpperCaseInitial } from '../../utils/getUpperCaseInitial';

interface IProps {
  onOpenDrawer?: (e: any) => void;
  employee?: IEmployee;
}
const Toolbar: FC<RouteComponentProps & IProps> = props => {
  const { location, history, employee, match, onOpenDrawer } = props;
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
  const RenderEmployeeInfoToolbar = () =>
    employee && <EmployeeInfoToolbar onGoBack={history.goBack} employee={employee} />;

  return (
    <>
      <Switch>
        <Route path={routes.SMS_LOG} render={SmsLogToolbar} />
        <Route path={routes.EMPLOYER_FORM} render={EmployerFormToolbar} />
        <Route path={routes.EMPLOYEE_FORM} render={EmployeeFormToolbar} />
        <Route path={routes.EMPLOYEE_LIST} render={EmployeeListToolbar} />
        <Route path={routes.EMPLOYEE_INFO} render={RenderEmployeeInfoToolbar} />
        <Route path={routes.E8FORM} render={E8Toolbar} />
      </Switch>
      {/* <div>
        You are now at {location.pathname}
        {location.search}
      </div> */}
    </>
  );
};

export default withRouter(Toolbar);
