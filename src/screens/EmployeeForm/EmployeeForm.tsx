import React, { FC, useState } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import WorkIcon from '@material-ui/icons/Work';
import TextField from '@material-ui/core/TextField';
import { addHours, setHours, setMinutes } from 'date-fns';
import { stickyTopWithAppbar } from '../../styles/mixins';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import AccountIcon from '@material-ui/icons/AccountCircle';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import WorkHourPicker from '../../components/WorkHourPicker';
import validateOnChange, {
  shouldType,
} from '../../FormsValidations/employeeFormValidations';
import { IEmployee } from '../../interfaces';
import { IEmployeeErrors } from '../../interfaces/IEmployeeErrors';

interface IProps extends WithStyles<typeof styles> {}
const EmployeeForm: FC<IProps> = props => {
  const variant = 'standard';
  const { classes } = props;

  const date: Date = setMinutes(setHours(new Date(), 8), 0);

  const [errors, setErrors] = useState<IEmployeeErrors>({
    name: '',
    vat: '',
    workStart: '',
    workFinish: '',
  });
  const [values, setValues] = useState({ name: '', vat: '' });
  const [workStart, setWorkStart] = useState(date);
  const [workFinish, setWorkFinish] = useState(addHours(date, 8));

  // const [isSubmitting, setIsSubmitting] = useState(false);

  // useEffect(() => {
  //   if (Object.keys(errors).length === 0 && isSubmitting) {
  //     // callback();
  //   }
  // }, [errors]);

  // const handleSubmit = (event: any) => {
  //   if (event) event.preventDefault();
  //   setErrors(validateOnSubmit(values));
  //   setIsSubmitting(true);
  // };

  const handleChange = (valueName: string) => (event: any) => {
    // event.persist();
    // if (!shouldType(event.target.value, valueName)) return;
    setValues(values => ({ ...values, [valueName]: event.currentTarget.value }));
  };
  return (
    <>
      <List
        className={classes.list}
        subheader={
          <ListSubheader color="primary" className={classes.listHeader}>
            Στοιχεία Υπαλλήλου
          </ListSubheader>
        }
      >
        <ListItem key="employee-fullname">
          <ListItemIcon>
            <AccountIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            label={errors.name || 'Ονοματεπώνυμο'}
            error={!!errors.name}
            value={values.name}
            onChange={handleChange('name')}
            className={classes.textField}
          />
        </ListItem>
        <ListItem key="employee-vat">
          <ListItemIcon>
            <WorkIcon />
          </ListItemIcon>
          <TextField
            variant={variant}
            type="tel"
            label={errors.vat || 'ΑΦΜ'}
            error={!!errors.vat}
            value={values.vat}
            onChange={handleChange('vat')}
            className={classes.textField}
          />
        </ListItem>
      </List>
      <List
        className={classes.list}
        subheader={
          <ListSubheader color="primary" className={classes.listHeader}>
            Τυπικό ωράριο εργασίας
          </ListSubheader>
        }
      >
        <ListItem key="WorkHour">
          <WorkHourPicker
            labelStart="Ώρα Έναρξης"
            labelFinish="Ώρα Λήξης"
            valueStart={workStart}
            valueFinish={workFinish}
            onChangeStart={setWorkStart}
            onChangeFinish={setWorkFinish}
          />
        </ListItem>
      </List>
    </>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    list: {
      width: '100%',
      maxWidth: 600,
      '&:not(:first-child)': {
        marginTop: '2rem',
      },
    },
    listHeader: {
      backgroundColor: theme.palette.background.default,
      ...stickyTopWithAppbar,
    },
    textField: {
      width: '100%',
    },
  });

export default withStyles(styles)(EmployeeForm);
