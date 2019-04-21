import React, { FC, ComponentProps } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {}
type Props = IProps & ComponentProps<typeof IconButton>;
const LeftIconButton: FC<Props> = props => (
  <IconButton color="inherit" {...props} className={props.classes.leftButton} />
);
const styles = (theme: any) =>
  createStyles({
    leftButton: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export default withStyles(styles)(LeftIconButton);
