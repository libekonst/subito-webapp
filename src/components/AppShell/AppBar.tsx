import React, { FC } from 'react';
import { default as MuiAppBar } from '@material-ui/core/AppBar';

const AppBar: FC<{}> = props => {
  return (
    <MuiAppBar position="sticky" color="default">
      {props.children}
    </MuiAppBar>
  );
};

export default AppBar;