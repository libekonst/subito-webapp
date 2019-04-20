import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

interface IProps extends WithStyles<typeof styles> {}

const E8Form: FC<IProps> = props => {
  const classes = { props };
  const [state, setState] = useState({
    expanded: false,
    value: 'submitNew',
  });
  const expand = () => setState({ ...state, expanded: !state.expanded });
  const selectSubmitionType = (e: any) => setState({ ...state, value: e.target.value });
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={props.classes.menuButton}
            color="inherit"
            aria-label="Menu"
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={props.classes.grow}>
            Έντυπο Ε8
          </Typography>
        </Toolbar>
      </AppBar>
      <List>
        <ListItem button divider onClick={expand}>
          <Avatar>ΓΧ</Avatar>
          <ListItemText
            primary="Γιάννης Χιονίδης"
            secondary={
              state.expanded && (
                <>
                  <Typography
                    component="span"
                    // className={classes.inline}
                    color="textSecondary"
                  >
                    ΑΦΜ: 129384569
                  </Typography>
                  {'08:00 - 16:00'}
                </>
              )
            }
          />
          <ListItemSecondaryAction>
            <IconButton aria-label="Expand info" onClick={expand}>
              {state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      </List>
      <FormControl className={props.classes.formControl}>
        <FormLabel>Τύπος υποβολής</FormLabel>
        {/* <FormHelperText>
          Ο τύπος υποβολής διαμορφώνει το μήνυμα που θα αποσταλεί.
        </FormHelperText> */}
        <RadioGroup
          aria-label="Submition type"
          name="submitionType"
          value={state.value}
          onChange={selectSubmitionType}
        >
          <FormControlLabel value="submitNew" control={<Radio />} label="Νέα υποβολή" />
          <FormControlLabel
            value="submitCancelPrevious"
            control={<Radio />}
            label="Ακύρωση τελευταίας υποβολής"
          />
        </RadioGroup>
      </FormControl>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
    formControl: {
      margin: theme.spacing.unit * 2,
    },
  });

export default withStyles(styles)(E8Form);
