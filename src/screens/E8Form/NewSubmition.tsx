import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import WorkHourPicker from '../../components/WorkHourPicker';

interface IProps extends WithStyles<typeof styles> {
  durationLabel: any;
  handleChangeDuration: any;
  overtimeStart: any;
  overtimeFinish: any;
  handleChangeOvertimeStart: any;
  handleChangeOvertimeFinish: any;
  durationOptions: any[];
}

const NewSubmition: FC<IProps> = props => {
  const {
    classes,
    durationLabel,
    handleChangeDuration,
    overtimeStart,
    overtimeFinish,
    handleChangeOvertimeStart,
    handleChangeOvertimeFinish,
    durationOptions,
  } = props;

  return (
    <>
      <FormControl className={`${classes.formControl} `}>
        <FormLabel>Διάρκεια υπερωρίας</FormLabel>
        <div className={classes.chipsForm}>
          {durationOptions.map(option => (
            <Chip
              className={classes.chip}
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
};

const styles = (theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing.unit * 2,
      display: 'block',
    },
    chip: {
      margin: theme.spacing.unit,
      fontSize: '1rem',
    },
    chipsForm: {
      display: 'flex',
      flexWrap: 'wrap',
      marginTop: theme.spacing.unit,
    },
  });

export default withStyles(styles)(NewSubmition);
