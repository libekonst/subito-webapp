import React, { FC, useState, useEffect } from 'react';
import { IEmployee } from '../../interfaces/IEmployee';
import {
  addMinutes,
  isAfter,
  isBefore,
  differenceInMinutes,
  format,
  setMinutes,
  getMinutes,
  getHours,
  setHours,
} from 'date-fns';
import E8FormView from './E8FormView';
import { IEmployer } from '../../interfaces';
import dexieDb from '../../db/db';
import { RouteComponentProps } from 'react-router';
import roundDateMinute from '../../utils/roundDate';

const durationOptions = [
  { key: 0, label: '30 λεπτά', duration: 30 },
  { key: 1, label: '1 ώρα', duration: 60 },
  { key: 2, label: '1 ώρα, 30 λεπτά', duration: 90 },
  { key: 3, label: '2 ώρες', duration: 120 },
  { key: 4, label: '2 ώρες, 30 λεπτά', duration: 150 },
  { key: 5, label: '3 ώρες', duration: 180 },
  // { key: 6, label: 'Άλλο...' },
];
interface IMatchParams {
  employeeID?: string;
}
const E8Form: FC<RouteComponentProps<IMatchParams>> = props => {
  const {
    match: {
      params: { employeeID },
    },
    history,
  } = props;

  const [employer, setEmployer] = useState();
  const [employee, setEmployee] = useState();
  const [isFetchingEmployee, setIsFetchingEmployee] = useState(true);
  const [isFetchingEmployer, setIsFetchingEmployer] = useState(true);

  const [overtimeStart, setOvertimeStart] = useState(roundDateMinute(new Date()));
  const [overtimeFinish, setOvertimeFinish] = useState(addMinutes(overtimeStart, 30));

  const [submitionType, setSubmitType] = useState('submitNew');
  const selectSubmitionType = (e: any) => setSubmitType(e.target.value);

  const [durationLabel, setDurationLabel] = useState(durationOptions[0].label);

  const [errors, setErrors] = useState({
    overtimeStart: '',
    overtimeFinish: '',
  });

  useEffect(() => {
    async function fetchEmployer() {
      try {
        const employer = await dexieDb.employer.toCollection().last();
        setEmployer(employer);
        setIsFetchingEmployer(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployer();
  }, []);

  useEffect(() => {
    async function fetchEmployee() {
      if (!employeeID) return;

      try {
        const employee = await dexieDb.employee.get(parseInt(employeeID));
        let employeeOvertimeStart;

        if (employee) {
          const workFinishHours = getHours(employee.workFinish);
          const workFinishMinutes = getMinutes(employee.workFinish);

          employeeOvertimeStart = setHours(
            setMinutes(new Date(), workFinishMinutes),
            workFinishHours,
          );
        }

        let initialOvertimeStart: Date;
        !employeeOvertimeStart || isAfter(new Date(), employeeOvertimeStart)
          ? (initialOvertimeStart = roundDateMinute(new Date()))
          : (initialOvertimeStart = employeeOvertimeStart);

        setOvertimeStart(initialOvertimeStart);
        setOvertimeFinish(addMinutes(initialOvertimeStart, 30));
        setEmployee(employee);
        setIsFetchingEmployee(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchEmployee();
  }, []);

  const makeErganiCode = () => {
    if (!employee) return '';
    if (!employer) return '';
    const data: string[] =
      submitionType === 'submitNew'
        ? [
            'Υ1',
            employer.vat + employer.ame || '',
            employee.vat,
            format(overtimeStart, 'HHmm') + format(overtimeFinish, 'HHmm'),
          ]
        : [employer.vat, employer.ame || '', employee.vat, '0000', '0000'];
    return data.join(' ');
  };

  const handleChangeDuration = (duration?: number) => (event: any) => {
    if (!duration) return; /* setDurationLabel(durationOptions[6].label); */

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
    setErrors(validate());
    setDurationLabel('');
  };
  const handleChangeOvertimeFinish = (date: Date) => {
    setOvertimeFinish(date);
    setErrors(validate());
    setDurationLabel('');
  };

  const validate = () => {
    let currentErrors = { overtimeStart: '', overtimeFinish: '' };

    // overtimeStart > overtimeFinish
    if (isAfter(overtimeStart, overtimeFinish))
      currentErrors.overtimeStart =
        'Η έναρξη της υπερωρίας πρέπει να είναι μετά την λήξη';

    // overtimeStart < employee.workFinish
    // if (isAfter())
    //   currentErrors.overtimeStart =
    //     'Η έναρξη της υπερωρίας πρέπει να είναι μετά τη λήξη της εργασίας';

    // overtimeStart  > Date.now ==> is Date.now() after overtimeStart ?
    if (isAfter(Date.now(), overtimeStart))
      currentErrors.overtimeStart =
        'Η υποβολή της δήλωσης πρέπει να γίνεται πρίν την έναρξη της υπερωρίας.';

    // overtimeFinish - overtimeStart > 180 minutes
    if (differenceInMinutes(overtimeFinish, overtimeStart) > 180)
      currentErrors.overtimeFinish =
        'Η διάρκια της υπερωρίας δεν μπορεί να υπερβαίνει τις 3 ώρες';

    return currentErrors;
  };

  const handleSubmitSms = async () => {
    if (!employee) return;

    validate();

    if (!!Object.values(errors).reduce((acc, val) => acc + val, ''))
      return console.log(errors);

    try {
      await dexieDb.sms.put({
        employee,
        overtimeStart,
        overtimeFinish,
        approved: true,
        dateSent: new Date(),
      });
      history.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <E8FormView
      onGoBack={history.goBack}
      erganiCode={makeErganiCode()}
      {...{
        errors,
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
        handleSubmitSms,
        employer,
        isFetchingEmployee,
        isFetchingEmployer,
      }}
    />
  );
};

export default E8Form;
