import React, { FC, ComponentProps } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

type Props = WithStyles<typeof styles> & ComponentProps<typeof CircularProgress>;
const CenteredSpinner: FC<Props> = props => {
  const { classes, ...rest } = props;

  return (
    <div className={classes.spinner}>
      <CircularProgress {...rest} />
    </div>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    spinner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: theme.spacing.unit * 12,
      padding: theme.spacing.unit * 3,
    },
  });

export default withStyles(styles)(CenteredSpinner);
