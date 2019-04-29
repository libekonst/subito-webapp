import React, { FC, ComponentProps } from 'react';
import { default as MuiAppBar } from '@material-ui/core/AppBar';

type Props = ComponentProps<typeof MuiAppBar>;
const AppBar: FC<Props> = props => (
  <MuiAppBar position="sticky" color="default" {...props} />
);

export default AppBar;
