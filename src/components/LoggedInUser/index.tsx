import React from 'react';
import styles from './LoggedInUser.module.scss';
import loggedInUserLogo from '../../assets/images/logged-in-user-logo.png';

const LoggedInUser: React.FC = () => {
  return (
    <div className={styles['logged-in-user']}>
      <img 
        alt='Logged in user Icon placeholder'
        src={loggedInUserLogo}
      />
    </div>
  );
};

export default LoggedInUser;