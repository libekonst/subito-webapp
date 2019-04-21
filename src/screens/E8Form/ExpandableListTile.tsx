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

interface IProps {
  employeeName: string;
  vatNumber: string;
  workHours: string;
  initials: string;
}

function ExpandableListTile(props: IProps & ComponentProps<typeof ListItem>) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);
  const { initials, employeeName, vatNumber, workHours, ...rest } = props;

  return (
    <List>
      <ListItem {...rest} onClick={toggleExpand}>
        <Avatar>{initials}</Avatar>
        <ListItemText
          primary={employeeName}
          secondary={
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography component="span" color="textSecondary">
                {`ΑΦΜ: ${vatNumber}`}
              </Typography>
              {workHours}
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
