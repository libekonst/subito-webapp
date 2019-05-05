import React, { FC, useState, useEffect } from 'react';
import { withStyles, createStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import CancelSubmitionInfoCard from './CancelSubmitionInfoCard';
import ExpandableListTile from '../../components/ExpandableListTile';
import BottomMessageTile from './BottomMessageTile';
import Slide from '@material-ui/core/Slide';
import Fade from '@material-ui/core/Fade';
import NewSubmition from './NewSubmition';
import { DeadEndToolbar, AppBar } from '../../components/AppShell';
import { IEmployer } from '../../interfaces';
import CenteredSpinner from '../../components/CenteredSpinner';
import { Typography } from '@material-ui/core';
import NotFound from '../../components/NotFound';

interface IProps extends WithStyles<typeof styles> {
  errors: { overtimeStart: string; overtimeFinish: string };
  durationLabel: any;
  handleChangeDuration: any;
  overtimeStart: any;
  overtimeFinish: any;
  handleChangeOvertimeStart: any;
  handleChangeOvertimeFinish: any;
  employee: any;
  submitionType: any;
  selectSubmitionType: any;
  durationOptions: any[];
  erganiCode: string;
  onGoBack?: (e: any) => void;
  handleSubmitSms: any;
  employer: IEmployer;
  isFetchingEmployee: boolean;
  isFetchingEmployer: boolean;
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
    employer,
    isFetchingEmployee,
    isFetchingEmployer,
  } = props;

  const [isError, setIsError] = useState();
  useEffect(() => {
    function setIsErrorOnErrorsChange() {
      setIsError(!!Object.values(errors).reduce((acc, val) => acc + val, ''));
    }
    setIsErrorOnErrorsChange();
  }, [errors]);

  return (
    <>
      <AppBar>
        <DeadEndToolbar pageTitle="Έντυπο Ε8" onGoBack={onGoBack} />
      </AppBar>
      {(isFetchingEmployee || isFetchingEmployer) && <CenteredSpinner />}
      <Fade in={!isFetchingEmployee && !isFetchingEmployer}>
        <div>
          {!employee && <NotFound icon="sadface" message="Δεν βρέθηκε υπάλληλος" />}
          {!employer && (
            <NotFound icon="sadface" message="Δεν βρέθηκαν στοιχεία εργοδότη" />
          )}
          {employee && employer && (
            <div>
              <section className={classes.section}>
                <ExpandableListTile employee={employee} divider button />

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
                {isError && (
                  <Typography>
                    {errors.overtimeStart + '\n' + errors.overtimeFinish}
                  </Typography>
                )}
                <BottomMessageTile
                  message={erganiCode}
                  isNewSubmition={submitionType === 'submitNew'}
                  {...{ handleSubmitSms, isError, employer }}
                />
              </section>
            </div>
          )}
        </div>
      </Fade>
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
