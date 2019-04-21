import React, { useState } from 'react';
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
  employerName: string;
  vatNumber: string;
  workHours: string;
  initials: string;
}

function ExpandableListTile(props: IProps) {
  const [expanded, setExpanded] = useState(false);
  const toggleExpand = () => setExpanded(!expanded);

  return (
    <List>
      <ListItem button divider onClick={toggleExpand}>
        <Avatar>{props.initials}</Avatar>
        <ListItemText
          primary={props.employerName}
          secondary={
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Typography component="span" color="textSecondary">
                {`ΑΦΜ: ${props.vatNumber}`}
              </Typography>
              {props.workHours}
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
