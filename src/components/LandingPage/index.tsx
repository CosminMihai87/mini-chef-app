import {
  FC
} from 'react';
import styles from './LandingPage.module.scss';
import Ingredients from '../Ingredients';

export interface ILandingPageProps {}

const LandingPage: FC<ILandingPageProps> = (props) => {

  return (
    <div className={styles['landing-page']}>
      <Ingredients />
    </div>
  );
};

export default LandingPage;