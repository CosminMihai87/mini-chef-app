import {
  FC
} from 'react';
import styles from './Fridge.module.scss';
import { Outlet } from 'react-router-dom';

export interface IFridgeProps {}

const Fridge: FC<IFridgeProps> = (props) => {

  return (
    <div className={styles.fridge}>
      Fridge
      <Outlet />
    </div>
  );
};

export default Fridge;