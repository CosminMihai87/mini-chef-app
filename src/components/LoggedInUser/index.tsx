import React, { 
  useRef,
  RefObject
} from 'react';
import styles from './LoggedInUser.module.scss';
import FwButton from '../../shared/templates/Button';
import loggedInUserLogo from '../../assets/images/logged-in-user-logo.png';

const Loading: React.FC = () => {
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
        variant='secondary'
      >
        <img 
          alt='Logged in user Icon placeholder'
          src={loggedInUserLogo}
        />
      </FwButton>
    </div>
  );
};

export default Loading;