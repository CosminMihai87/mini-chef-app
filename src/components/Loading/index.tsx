import React from 'react';
import styles from './Loading.module.scss';
import loadingAnimation from '../../assets/images/loading.gif';

const Loading: React.FC = () => {

  return (
    <div className={styles['loading']}>
      <img 
        alt='Loading Animation placeholder'
        src={loadingAnimation}
      />
    </div>
  );
};

export default Loading;