import {
  FC,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageContent.module.scss';
import UseTransitionAnimation from '../../../shared/customHooks/useTransitionAnimation';

export interface IPageContent {
  children: ReactElement
}

const PageContent: FC<IPageContent> = (props) => {
  const { children } = {...props};
  const location = useLocation();
  const [show, setShow] = useState(true);

  useEffect(()=> {
    setShow(false);
  },[location]);

  useEffect(()=> {
    !show && setTimeout(()=>{
      setShow(true);
    },500);
  },[show]);
  
  return (
    <UseTransitionAnimation
      className={styles['transition-wrapper']}
      defaultStyle={{
        // display: 'none',
        backdropFilter: 'brightness(20%) blur(8px)',
        transform: 'translateX(calc(100vw))',
        transition: 'all 500ms ease-in-out',
      }}
      delay={0}
      show={show}
      transitionStyle={{
        entering: {
          // display: 'block',
          backdropFilter: 'brightness(20%) blur(8px)',
          transform: 'translateX(calc(50vw))',
          transition: 'all 500ms ease-in-out',
        },
        entered: {
          // display: 'block',
          transform: 'translateX(0)',
          transition: 'all 500ms ease-in-out',
        },
        exiting: {
          // display: 'block',
          backdropFilter: 'brightness(20%) blur(8px)',
          transform: 'translateX(0)',
          transition: 'all 500ms ease-in-out',
        },
        exited: {
          // display: 'block',
          transform:'translateX(calc(100vw))',
          transition: 'all 500ms ease-in-out',
        }
      }}
    >
      <div className={styles['page-content']}> 
        {show && children}
      </div> 
    </UseTransitionAnimation>
  );
};

export default PageContent;