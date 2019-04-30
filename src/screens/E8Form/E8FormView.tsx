import React, { FC } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CancelSubmitionInfoCard from './CancelSubmitionInfoCard';
import ExpandableListTile from './ExpandableListTile';
import BottomMessageTile from './BottomMessageTile';

import NewSubmition from './NewSubmition';
import { DeadEndToolbar, AppBar } from '../../components/AppShell';
import { IEmployer } from '../../interfaces';

interface IProps extends WithStyles<typeof styles> {
  durationLabel: any;
  handleChangeDuration: any;
  overtimeStart: any;
  overtimeFinish: any;
  handleChangeOvertimeStart: any;
  handleChangeOvertimeFinish: any;
  employee: any;
  submitionType: any;
  selectSubmitionType: any;
  errors: any;
  durationOptions: any[];
  erganiCode: string;
  onGoBack?: (e: any) => void;
  handleSubmitSms: any;
  employer:IEmployer;
}

const E8FormView: FC<IProps> = props => {
  const {
    classes,
    durationLabel,
    handleChangeDuration,
    overtimeStart,
    overtimeFinish,
    handleChangeOvertimeStart,
    handleChangeOvertimeFinish,
    employee,
    submitionType,
    selectSubmitionType,
    durationOptions,
    onGoBack,
    erganiCode,
    handleSubmitSms,
    errors,
    employer
  } = props;

  return (
    <>
      <AppBar>
        <DeadEndToolbar pageTitle="Έντυπο Ε8" onGoBack={onGoBack} />
      </AppBar>

      <section className={classes.section}>
        <ExpandableListTile employee={employee} divider />

        <FormControl className={classes.formControl}>
          <FormLabel>Τύπος υποβολής</FormLabel>
          <RadioGroup
            aria-label="Submition type"
            name="submitionType"
            value={submitionType}
            onChange={selectSubmitionType}
          >
            <FormControlLabel
              value="submitNew"
              control={<Radio />}
              label="Νέα υποβολή"
            />
            <FormControlLabel
              value="submitCancelPrevious"
              control={<Radio />}
              label="Ακύρωση τελευταίας υποβολής"
            />
          </RadioGroup>
        </FormControl>

        {submitionType === 'submitNew' ? (
          <NewSubmition
            {...{
              classes,
              durationLabel,
              handleChangeDuration,
              overtimeStart,
              overtimeFinish,
              handleChangeOvertimeStart,
              handleChangeOvertimeFinish,
              durationOptions,
            }}
          />
        ) : (
          <CancelSubmitionInfoCard />
        )}
        <BottomMessageTile
          message={erganiCode}
          isNewSubmition={submitionType === 'submitNew'}
          {...{ handleSubmitSms, errors, employer }}
        />
      </section>
    </>
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
  });

export default withStyles(styles)(E8FormView);
