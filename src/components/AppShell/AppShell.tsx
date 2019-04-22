import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import AppBar from './AppBar';
import Toolbar from './Toolbar';

interface IProps {
  isDrawerOpen: boolean;
  location?: any;
  history?: any;
  toggleDrawerOpen: (e: any) => void;
}
function AppShell(props: IProps) {
  const { isDrawerOpen, toggleDrawerOpen } = props;

  return (
    <>
      <AppBar>
        <Toolbar onOpenDrawer={toggleDrawerOpen} />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerOpen} isOpen={isDrawerOpen} />
    </>
  );
}

export default AppShell;
