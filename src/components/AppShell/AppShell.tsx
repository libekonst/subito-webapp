import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import AppBar from './AppBar';
import Toolbar from './Toolbar';

// 1. Dead end toolbar
// 2. Employee name from state
// 3. If no name, "Υπάλληλος"
interface IProps {
  isDrawerOpen: boolean;
  location?: any;
  history?: any;
  toggleDrawerOpen: (e: any) => void;
}
function AppShell(props: IProps) {
  const { isDrawerOpen, toggleDrawerOpen, location, history } = props;

  return (
    <>
      <AppBar>
        <Toolbar history={history} location={location} onOpenDrawer={toggleDrawerOpen} />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerOpen} isOpen={isDrawerOpen} />
    </>
  );
}

export default AppShell;
