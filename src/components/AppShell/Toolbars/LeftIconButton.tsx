import React, { FC, ComponentProps } from 'react';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {}
type Props = IProps & ComponentProps<typeof IconButton>;
const LeftIconButton: FC<Props> = ({ classes, ...rest }) => (
  <IconButton color="inherit" {...rest} className={classes.buttonMargin} />
);
const styles = (theme: any) =>
  createStyles({
    buttonMargin: {
      marginLeft: -12,
      marginRight: 20,
    },
  });

export default withStyles(styles)(LeftIconButton);
