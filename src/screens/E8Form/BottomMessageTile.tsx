import React from 'react';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import SmsIcon from '@material-ui/icons/Sms';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
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
      <Button
        onClick={navigator.clipboard && copyToClipboard}
        className={props.classes.messageContainer}
      >
        <Typography noWrap>{props.message}</Typography>
        <FileCopyIcon color="primary" fontSize="small" />
      </Button>
      <IconButton
        className={props.classes.sendButton}
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
      justifyContent: 'stretch',
      alignItems: 'center',
    },
    sendButton: {
      margin: theme.spacing.unit / 2,
    },
    messageContainer: {
      // Flex
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      // Styles
      padding: theme.spacing.unit,
      backgroundColor: theme.palette.grey[300],
      borderRadius: 50,
    },
  });

export default withStyles(styles)(BottomMessageTile);
