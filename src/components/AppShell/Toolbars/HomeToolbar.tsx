import React, { FC } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import BackupIcon from '@material-ui/icons/Backup';
import PageTitle from './PageTitle';
import LeftIconButton from './LeftIconButton';

interface IProps {
  pageTitle?: string;
  onOpenDrawer?: (e: any) => void;
}
const HomeToolbar: FC<IProps> = props => {
  const { pageTitle, onOpenDrawer } = props;
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
      <IconButton color="inherit">
        <BackupIcon />
      </IconButton>
    </Toolbar>
  );
};

export default HomeToolbar;
