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
import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

interface IProps extends WithStyles<typeof styles> {}
interface IState {
  expanded: boolean;
  cardDetailsExpanded: boolean;
  value: 'submitNew' | 'submitCancelPrevious';
  duration: string;
}

const E8Form: FC<IProps> = props => {
  const classes = { props };
  const [state, setState] = useState<IState>({
    expanded: false,
    value: 'submitNew',
    duration: '30 λεπτά',
    cardDetailsExpanded: false,
  });
  const expand = () => setState({ ...state, expanded: !state.expanded });
  const expandDetails = () =>
    setState({ ...state, cardDetailsExpanded: !state.cardDetailsExpanded });
  const selectSubmitionType = (e: any) => setState({ ...state, value: e.target.value });
  const selectDuration = (value: string) => () =>
    setState({ ...state, duration: value });
  const durationOptions = [
    { key: 0, value: '30 λεπτά' },
    { key: 1, value: '1 ώρα' },
    { key: 2, value: '1 ώρα, 30 λεπτά' },
    { key: 3, value: '2 ώρες' },
    { key: 4, value: '2 ώρες, 30 λεπτά' },
    { key: 5, value: '3 ώρες' },
  ];
  return (
    <>
      <AppBar position="sticky">
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
      {state.value === 'submitNew' ? (
        <FormControl className={`${props.classes.formControl} `}>
          <FormLabel>Διάρκεια υπερωρίας</FormLabel>
          <div className={props.classes.chipsForm}>
            {durationOptions.map(option => (
              <Chip
                className={props.classes.chip}
                key={option.key}
                // color={option.value === state.duration ? 'secondary' : 'primary'}
                color="primary"
                label={option.value}
                onClick={selectDuration(option.value)}
                variant={state.duration === option.value ? 'default' : 'outlined'}
              />
            ))}
          </div>
        </FormControl>
      ) : (
        <Card className={props.classes.formControl}>
          <CardContent>
            {/* <Typography
              className={props.classes.smallHeader}
              color="textSecondary"
              gutterBottom
            >
              Ακύρωση προηγούμενης υποβολής
            </Typography> */}
            <Typography color="textPrimary" gutterBottom>
              Αυτή η επιλογή αντικαθιστά τις ώρες υπερωρίας με τον αριθμό 0 στο μήνυμα
              που θα αποσταλεί.
            </Typography>

            <Collapse in={state.cardDetailsExpanded} timeout="auto" unmountOnExit>
              <Typography paragraph>
                Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
                aside for 10 minutes. Heat 1/2 cup of the broth in a pot until simmering,
                add saffron and set aside for 10 minutes.
              </Typography>
            </Collapse>
            <CardActions className={props.classes.actions}>
              <Button color="primary" onClick={expandDetails}>
                {state.cardDetailsExpanded ? 'Λιγοτερα' : 'Περισσοτερα'}
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      )}
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
      display: 'block',
    },
    chipsForm: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing.unit,
    },
    chip: {
      margin: theme.spacing.unit,
      fontSize: '1rem',
    },
    smallHeader: {
      fontSize: '1rem',
    },
    actions: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
  });

export default withStyles(styles)(E8Form);
