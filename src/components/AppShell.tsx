import React, { useState } from 'react';
import AppDrawer from './AppDrawer';
import AppBar from './AppBar';
import { DeadEndToolbar } from './Toolbars';
 
// 1. Dead end toolbar
// 2. Employee name from state
// 3. If no name, "Υπάλληλος"
interface IProps {
  isDrawerOpen: boolean;
  toggleDrawerOpen: (e: any) => void;
}
function AppShell(props: IProps) {
  const { isDrawerOpen, toggleDrawerOpen } = props;

  return (
    <>
      <AppBar>
        <DeadEndToolbar pageTitle="AppShell" />
      </AppBar>
      <AppDrawer toggleOpen={toggleDrawerOpen} isOpen={isDrawerOpen} />
    </>
  );
}

export default AppShell;
