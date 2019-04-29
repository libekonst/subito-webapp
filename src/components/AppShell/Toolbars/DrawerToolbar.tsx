import React, { FC, ReactNode } from 'react';

import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import PageTitle from './PageTitle';
import LeftIconButton from './LeftIconButton';

interface IProps {
  pageTitle?: string;
  onOpenDrawer?: (e: any) => void;
  secondaryActions?: ReactNode;
}
const DrawerToolbar: FC<IProps> = props => {
  const { pageTitle, onOpenDrawer, secondaryActions } = props;
  return (
    <Toolbar>
      <LeftIconButton
        onClick={onOpenDrawer}
        aria-label="Μενού Επιλογών"
        title="Μενού Επιλογών"
      >
        <MenuIcon />
      </LeftIconButton>
      <PageTitle pageTitle={pageTitle} />
      {secondaryActions}
    </Toolbar>
  );
};

export default DrawerToolbar;
