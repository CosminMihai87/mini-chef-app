import {
  FC,
  ReactElement
} from 'react';
import styles from './PageContent.module.scss';

export interface IPageContent {
  children: ReactElement
}

const PageContent: FC<IPageContent> = (props) => {
  const { children } = {...props};
  
  return (
    <div className={styles['page-content']}> 
      {children}
    </div> 
  );
};

export default PageContent;