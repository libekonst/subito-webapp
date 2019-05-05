import React, { useEffect, useState } from 'react';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import FileCopyIcon from '@material-ui/icons/FileCopyOutlined';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import { IEmployer } from '../../interfaces';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';

interface IProps extends WithStyles<typeof styles> {
  message: string;
  isNewSubmition?: boolean;
  handleSubmitSms: any;
  isError: bool;
  employer: IEmployer;
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
  const { message, classes, isNewSubmition, isError } = props;

  const getColor = () => {
    if (isError) return 'disabled';
    if (isNewSubmition) return 'primary';
    return 'secondary';
  };

  return (
    <Paper className={props.classes.messageTile}>
      <Button
        onClick={navigator.clipboard && copyToClipboard}
        className={props.classes.messageContainer}
      >
        <Typography>{props.message}</Typography>
        <FileCopyIcon color="primary" fontSize="small" />
      </Button>
      {/* <Fab
        className={props.classes.fab}
        color={isNewSubmition ? 'primary' : 'secondary'}
        variant="extended"
      >
        <SendIcon color="inherit" style={{ marginRight: 10 }} />
        ΑΠΟΣΤΟΛΗ
      </Fab> */}
      <IconButton
        className={props.classes.sendButton}
        onClick={props.handleSubmitSms}
        disabled={isError}
        component={aProps => (
          <a
            href={`sms:${props.employer.smsNumber}?body=${props.message}`}
            {...aProps}
          />
        )}
      >
        <SendIcon color={getColor()} fontSize="large" />
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
      padding: theme.spacing.unit,
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
    fab: {
      position: 'fixed',
      bottom: 60,
      right: 10,
    },
  });

export default withStyles(styles)(BottomMessageTile);
