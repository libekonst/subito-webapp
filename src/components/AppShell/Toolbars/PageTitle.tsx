import React, { FC, ComponentProps } from 'react';
import Typography from '@material-ui/core/Typography';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  pageTitle?: string;
}
type Props = IProps & ComponentProps<typeof Typography>;

const PageTitle: FC<Props> = ({ classes, pageTitle, ...rest }) => (
  <Typography
    variant="h6"
    color="inherit"
    className={classes.pageTitle}
    align="left"
    {...rest}
  >
    {pageTitle}
  </Typography>
);

const styles = (theme: any) =>
  createStyles({
    pageTitle: {
      flex: 1,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
  });

export default withStyles(styles)(PageTitle);
