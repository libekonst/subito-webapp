import React from 'react';
import Chip from '@material-ui/core/Chip';
import SmsIcon from '@material-ui/icons/Sms';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  message: string;
}

function BottomMessageTile(props: IProps) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(props.message);
      alert('Το μήνυμα αντιγράφηκε!');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Paper className={props.classes.messageTile}>
      <Chip
        label={props.message}
        className={props.classes.messageTileText}
        onClick={navigator.clipboard && copyToClipboard}
      />
      <IconButton
        className={props.classes.messageTileIconButton}
        component={aProps => <a href={`sms:12345?body=${props.message}`} {...aProps} />}
      >
        <SmsIcon color="primary" />
      </IconButton>
    </Paper>
  );
}

const styles = (theme: Theme) =>
  createStyles({
    messageTile: {
      // Position
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,

      // Styles
      paddingLeft: theme.spacing.unit,
      paddingRight: 0,

      // Flex
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    messageTileIconButton: {
      margin: theme.spacing.unit / 2,
    },
    messageTileText: {
      fontSize: '1rem',
      display: 'flex',
      justifyContent: 'flex-start',
      flex: 1,
      overflow: 'hidden',
    },
  });

export default withStyles(styles)(BottomMessageTile);
