import React, { 
  useRef,
  RefObject
} from 'react';
import styles from './LoggedInUser.module.scss';
import FwButton from '../../utils/templates/Button';
import loggedInUserLogo from '../../assets/images/logged-in-user-logo.png';

const LoggedInUser: React.FC = () => {
  const btnLoggedInUserRef = useRef<RefObject<HTMLButtonElement> | null>(null);

  return (
    <div className={styles['logged-in-user']}>
      <FwButton
        animation='progress'
        id='btnLoggedInUser'
        innerRef={btnLoggedInUserRef}
        onClick={()=>{
          return; 
        }}
        tooltipText='User Settings'
      >
        <img 
          alt='Logged in user Icon placeholder'
          src={loggedInUserLogo}
        />
      </FwButton>
    </div>
  );
};

export default LoggedInUser;