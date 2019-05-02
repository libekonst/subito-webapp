import { getMinutes, addMinutes } from 'date-fns';

export default function roundDateMinute(date: Date) {
  const mins = getMinutes(date);
  const roundedDate = addMinutes(date, 10 - (mins % 10));
  return roundedDate;
}
