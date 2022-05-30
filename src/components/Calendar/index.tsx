import {
  FC
} from 'react';
import styles from './Calendar.module.scss';

export interface ICalendarProps {
  test?: string
}

const Calendar: FC<ICalendarProps> = (props) => {

  return (
    <div className={styles.calendar}>
      <h1>Calendar</h1>
    </div>
  );
};

export default Calendar;