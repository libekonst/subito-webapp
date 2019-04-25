import React, { FC, useState } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import CancelSubmitionInfoCard from './CancelSubmitionInfoCard';
import ExpandableListTile from './ExpandableListTile';
import BottomMessageTile from './BottomMessageTile';
import { IEmployee } from '../../interfaces/IEmployee';
import WorkHourPicker from '../../components/WorkHourPicker';
import { addMinutes, isAfter, isBefore, differenceInMinutes } from 'date-fns';

const durationOptions = [
  { key: 0, label: '30 λεπτά', duration: 30 },
  { key: 1, label: '1 ώρα', duration: 60 },
  { key: 2, label: '1 ώρα, 30 λεπτά', duration: 90 },
  { key: 3, label: '2 ώρες', duration: 120 },
  { key: 4, label: '2 ώρες, 30 λεπτά', duration: 150 },
  { key: 5, label: '3 ώρες', duration: 180 },
  { key: 6, label: 'Άλλο...' },
];

interface IProps extends WithStyles<typeof styles> {
  employee?: IEmployee;
}

const E8Form: FC<IProps> = props => {
  const [overtimeStart, setOvertimeStart] = useState(addMinutes(new Date(), 5));
  const [overtimeFinish, setOvertimeFinish] = useState(addMinutes(overtimeStart, 30));

  const [submitionType, setSubmitType] = useState('submitNew');
  const selectSubmitionType = (e: any) => setSubmitType(e.target.value);

  const [durationLabel, setDurationLabel] = useState(durationOptions[0].label);

  const handleChangeDuration = (duration?: number) => (event: any) => {
    if (!duration) return setDurationLabel(durationOptions[6].label);

    // find the durationOption
    // store it to set the durationLabel in the next lines.
    const durOpt = durationOptions.find(el => el.duration === duration);
    if (!durOpt) return;

    setDurationLabel(durOpt.label);

    // with validate()
    // handleChangeOvertimeFinish(addMinutes(overtimeStart, duration));

    // without validate()
    setOvertimeFinish(addMinutes(overtimeStart, duration));
  };
  const handleChangeOvertimeStart = (date: Date) => {
    setOvertimeStart(date);
    validate();
  };
  const handleChangeOvertimeFinish = (date: Date) => {
    setOvertimeFinish(date);
    validate();
  };

  const [errors, setErrors] = useState({
    overtimeStart: '',
    overtimeFinish: '',
  });
  const validate = () => {
    let currentErrors = { overtimeStart: '', overtimeFinish: '' };

    // overtimeStart > overtimeFinish
    if (isAfter(overtimeStart, overtimeFinish))
      currentErrors.overtimeStart =
        'Η έναρξη της υπερωρίας πρέπει να είναι μετά την λήξη';

    // overtimeStart < employee.workFinish
    if (isBefore(overtimeStart, props.employee!.workFinish))
      currentErrors.overtimeStart =
        'Η έναρξη της υπερωρίας πρέπει να είναι μετά τη λήξη της εργασίας';

    // overtimeStart  > Date.now
    if (isAfter(overtimeStart, Date.now()))
      currentErrors.overtimeStart =
        'Η έναρξη της υπερωρίας πρέπει να είναι μετά την ώρα που υποβάλεται η δήλωση';

    // overtimeFinish - overtimeStart > 180 minutes
    if (differenceInMinutes(overtimeFinish, overtimeStart) > 180)
      currentErrors.overtimeFinish =
        'Η διάρκια της υπερωρίας δεν μπορεί να υπερβαίνει τις 3 ώρες';

    setErrors(currentErrors);
  };

  // JSX
  const newSubmition = (
    <>
      <FormControl className={`${props.classes.formControl} `}>
        <FormLabel>Διάρκεια υπερωρίας</FormLabel>
        <div className={props.classes.chipsForm}>
          {durationOptions.map(option => (
            <Chip
              className={props.classes.chip}
              key={option.key}
              color="primary"
              label={option.label}
              onClick={handleChangeDuration(option.duration)}
              variant={durationLabel === option.label ? 'default' : 'outlined'}
            />
          ))}
        </div>
      </FormControl>
      {durationLabel === 'Άλλο...' && (
        <WorkHourPicker
          valueStart={overtimeStart}
          valueFinish={overtimeFinish}
          onChangeStart={handleChangeOvertimeStart}
          onChangeFinish={handleChangeOvertimeFinish}
        />
      )}
    </>
  );
  return (
    <section className={props.classes.section}>
      <ExpandableListTile employee={props.employee} divider button />
      <FormControl className={props.classes.formControl}>
        <FormLabel>Τύπος υποβολής</FormLabel>
        <RadioGroup
          aria-label="Submition type"
          name="submitionType"
          value={submitionType}
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
      {submitionType === 'submitNew' ? newSubmition : <CancelSubmitionInfoCard />}
      <BottomMessageTile message="Y1 1293845692 129384569 16001700" />
    </section>
  );
};

const styles = (theme: Theme) =>
  createStyles({
    section: {
      paddingBottom: theme.spacing.unit * 10,
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
  });

export default withStyles(styles)(E8Form);
