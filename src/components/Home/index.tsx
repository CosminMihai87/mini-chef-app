import {
  FC
} from 'react';
import { Outlet } from 'react-router-dom';
import styles from './Home.module.scss';
// import Ingredients from '../Ingredients';

export interface IHomeProps {}

const Home: FC<IHomeProps> = (props) => {

  return (
    <div className={styles['home']}> 
      {/* <Ingredients /> */}
      <Outlet />
    </div>
  );
};

export default Home;