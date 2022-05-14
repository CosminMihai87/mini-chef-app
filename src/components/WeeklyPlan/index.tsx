import {
  FC
} from 'react';
import styles from './WeeklyPlan.module.scss';

export interface IWeeklyPlanProps {}

const WeeklyPlan: FC<IWeeklyPlanProps> = (props) => {

  return (
    <div className={styles['weekly-plan']}>
      WeeklyPlan
    </div>
  );
};

export default WeeklyPlan;