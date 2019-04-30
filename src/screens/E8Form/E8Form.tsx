import React, { FC, useState, useEffect } from 'react';
import { IEmployee } from '../../interfaces/IEmployee';
import { addMinutes, isAfter, isBefore, differenceInMinutes, format } from 'date-fns';
import E8FormView from './E8FormView';

const durationOptions = [
  { key: 0, label: '30 λεπτά', duration: 30 },
  { key: 1, label: '1 ώρα', duration: 60 },
  { key: 2, label: '1 ώρα, 30 λεπτά', duration: 90 },
  { key: 3, label: '2 ώρες', duration: 120 },
  { key: 4, label: '2 ώρες, 30 λεπτά', duration: 150 },
  { key: 5, label: '3 ώρες', duration: 180 },
  { key: 6, label: 'Άλλο...' },
];

interface IProps {
  employee?: IEmployee;
  onGoBack?: (e: any) => void;
}

const E8Form: FC<IProps> = props => {
  const { employee } = props;

  const [overtimeStart, setOvertimeStart] = useState(addMinutes(new Date(), 5));
  const [overtimeFinish, setOvertimeFinish] = useState(addMinutes(overtimeStart, 30));

  const [submitionType, setSubmitType] = useState('submitNew');
  const selectSubmitionType = (e: any) => setSubmitType(e.target.value);

  const [durationLabel, setDurationLabel] = useState(durationOptions[0].label);

  const makeErganiCode = () => {
    if (!employee) return '';
    const data: string[] = [
      employee.vat,
      format(overtimeStart, 'HHmm'),
      format(overtimeFinish, 'HHmm'),
    ];
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

    return currentErrors;
  };

  return (
    <E8FormView
      onGoBack={props.onGoBack}
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
      }}
    />
  );
};

export default E8Form;
