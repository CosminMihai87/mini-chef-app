import React from 'react';
import styles from './LoggedInUser.module.scss';
import FwButton from '../../utils/templates/Button';
// import loggedInUserLogo from '../../assets/images/logged-in-user-logo.png';

const LoggedInUser: React.FC = () => {
  return (
    <div className={styles['logged-in-user']}>
      <FwButton
        id='btnLoggedInUser'
        onClick={()=>{
          console.log('clicked');
        }}
        tooltipText={'User Settings'}
      >
        User Settings
        {/* <img 
          alt='Logged in user Icon placeholder'
          src={loggedInUserLogo}
        /> */}
      </FwButton>
    </div>
  );
};

export default LoggedInUser;