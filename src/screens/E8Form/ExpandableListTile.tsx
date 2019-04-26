import React, { useState, ComponentProps } from 'react';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import { IEmployee } from '../../interfaces/IEmployee';
import { toUpperCaseInitial } from '../../utils/getUpperCaseInitial';
import PersonIcon from '@material-ui/icons/Person';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { createStyles, withStyles, WithStyles } from '@material-ui/core/styles';

interface IProps extends WithStyles<typeof styles> {
  employee?: IEmployee;
  goBack?: () => void;
}

function ExpandableListTile(props: IProps & ComponentProps<typeof ListItem>) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const { employee, goBack, classes, ...rest } = props;

  const employeeFiller = {
    name: 'Επιλέξτε υπάλληλο',
    vat: '000000000',
    workStart: '00:00',
    workFinish: '00:00',
  };

  const { name, vat, workStart, workFinish } = employee ? employee : employeeFiller;
  let initial;
  if (employee) initial = toUpperCaseInitial(employee.name);

  return (
    <div style={{ flex: 1 }}>
      <ListItem {...rest} /* onClick={!employee ? goBack : toggleExpand} */>
        <Avatar>{initial || <PersonIcon />}</Avatar>
        <ExpansionPanel className={classes.expansionPanel}>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography className={classes.title}>{name}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <div>
              <Typography color="textSecondary">{`ΑΦΜ: ${vat}`}</Typography>
              <Typography color="textSecondary">
                {`${workStart || '00:00'} - ${workFinish || '00:00'}`}
              </Typography>
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        {/* <ListItemText
          primary={name}
          secondary={
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography color="textSecondary">{`ΑΦΜ: ${vat}`}</Typography>
              <Typography color="textSecondary">
                {`${workStart || '00:00'} - ${workFinish || '00:00'}`}
              </Typography>
            </Collapse>
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Expand info" onClick={toggleExpand}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItemSecondaryAction> */}
      </ListItem>
    </div>
  );
}

const styles = (theme: any) =>
  createStyles({
    expansionPanel: {
      flex: 1,
      backgroundColor: 'transparent',
      boxShadow: 'none',
      minHeight: 0,
      '&::before': { visibility: 'hidden' },
    },
    title: {
      fontSize: '1rem',
      fontWeight: 400,
    }
  });

export default withStyles(styles)(ExpandableListTile);
