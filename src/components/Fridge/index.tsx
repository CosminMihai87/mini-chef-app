import {
  FC
} from 'react';
import styles from './Fridge.module.scss';

export interface IFridgeProps {
  test?: string
}

const Fridge: FC<IFridgeProps> = (props) => {

  return (
    <div className={styles.fridge}>
      <h1>Fridge</h1>
    </div>
  );
};

export default Fridge;