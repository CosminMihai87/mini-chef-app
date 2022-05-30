import {
  FC
} from 'react';
import styles from './WeeklyPlan.module.scss';

export interface IWeeklyPlanProps {
  test?: string
}

const WeeklyPlan: FC<IWeeklyPlanProps> = (props) => {

  return (
    <div className={styles['weekly-plan']}>
      <h1>WeeklyPlan</h1>
    </div>
  );
};

export default WeeklyPlan;