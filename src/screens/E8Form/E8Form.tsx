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
  { key: 6, label: 'Άλλο...' },
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
  const [employee, setEmployee] = useState<IEmployee>();
  useEffect(() => {
    async function fetchEmployer() {
      const employer = await dexieDb.employer.toCollection().last();
      if (!employer) return;
      setEmployer(employer);
    }
    fetchEmployer();
  }, []);

  useEffect(() => {
    async function fetchEmployee() {
      if (!employeeID) return;
      let employee;
      try {
        employee = await dexieDb.employee.get(parseInt(employeeID));
      } catch (error) {
        console.log(error);
      }
      if (!employee) return;

      const workFinishHour = getHours(employee.workFinish);
      const workHourMinute = getMinutes(employee.workFinish);
      let overtimeStartInitial = setHours(
        setMinutes(new Date(), workHourMinute),
        workFinishHour,
      );
      if (isAfter(new Date(), overtimeStartInitial))
        overtimeStartInitial = roundDateMinute(new Date());

      setEmployee(employee);
      setOvertimeStart(overtimeStartInitial);
      setOvertimeFinish(addMinutes(overtimeStartInitial, 30));
    }
    fetchEmployee();
  }, []);

  const [overtimeStart, setOvertimeStart] = useState(roundDateMinute(new Date()));
  const [overtimeFinish, setOvertimeFinish] = useState(addMinutes(overtimeStart, 30));

  const [submitionType, setSubmitType] = useState('submitNew');
  const selectSubmitionType = (e: any) => setSubmitType(e.target.value);

  const [durationLabel, setDurationLabel] = useState(durationOptions[0].label);

  const makeErganiCode = () => {
    if (!employee) return '';
    if (!employer) return '';
    const data: string[] =
      submitionType === 'submitNew'
        ? [
            employer.vat,
            employer.ame || '',
            employee.vat,
            format(overtimeStart, 'HHmm'),
            format(overtimeFinish, 'HHmm'),
          ]
        : [employer.vat, employer.ame || '', employee.vat, '0000', '0000'];
    return data.join(' ');
  };

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
    setErrors(validate());
  };
  const handleChangeOvertimeFinish = (date: Date) => {
    setOvertimeFinish(date);
    setErrors(validate());
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
    if (isBefore(overtimeStart, employee!.workFinish))
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

  return employer && employee ? (
    <E8FormView
      onGoBack={history.goBack}
      erganiCode={makeErganiCode()}
      {...{
        durationLabel,
        handleChangeDuration,
        overtimeStart,
        overtimeFinish,
        handleChangeOvertimeStart,
        handleChangeOvertimeFinish,
        employee,
        submitionType,
        selectSubmitionType,
        errors,
        durationOptions,
        handleSubmitSms,
        employer,
      }}
    />
  ) : (
    <div>lol</div>
  );
};

export default E8Form;
