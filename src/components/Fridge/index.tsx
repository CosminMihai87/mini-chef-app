import {
  FC
} from 'react';
import styles from './Fridge.module.scss';

export interface IFridgeProps {}

const Fridge: FC<IFridgeProps> = (props) => {

  return (
    <div className={styles.fridge}>
      Fridge
    </div>
  );
};

export default Fridge;