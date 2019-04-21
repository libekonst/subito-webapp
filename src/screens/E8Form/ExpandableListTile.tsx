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

interface IProps {
  employee?: IEmployee;
}

function ExpandableListTile(props: IProps & ComponentProps<typeof ListItem>) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const { employee, ...rest } = props;

  const employeeFiller = {
    name: 'Επιλέξτε υπάλληλο',
    vat: '000000000',
    workStart: '00:00',
    workFinish: '00:00',
  };

  const { name, vat, workStart, workFinish } = employee ? employee : employeeFiller;

  return (
    <List>
      <ListItem {...rest} onClick={toggleExpand}>
        <Avatar>{employee && name.length ? name[0] : ''}</Avatar>
        <ListItemText
          primary={name}
          secondary={
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography component="span" color="textSecondary">
                {`ΑΦΜ: ${vat}`}
              </Typography>
              {`${workStart} - ${workFinish}`}
            </Collapse>
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Expand info" onClick={toggleExpand}>
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </List>
  );
}
export default ExpandableListTile;
