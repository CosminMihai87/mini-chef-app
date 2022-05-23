import {
  FC,
  ReactElement,
  useState,
  useEffect
} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageContent.module.scss';

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
    <div className={styles['transition-wrapper']}> 
      <div className={styles['page-content']}> 
        {show && children}
      </div> 
    </div>
  );
};

export default PageContent;