import React, {
  Suspense,
  lazy
} from 'react';
import styles from './PageContent.module.scss';
import FwButton from '../../../utils/templates/Button';
import Loading from '../../../components/Loading';

const PageContent: React.FC = () => {

  const DummyComponent = lazy(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        return resolve(import('../../../utils/DummyComponent') as any);
      }, 1500);
    });
  });

  return (
    <div className={styles['page-content']}>
      <div className={styles['buttons']}>
        <FwButton
          animation='progress'
          onClick={()=>{
            return ; 
          }} 
          variant='primary'
        >
          <span>Primary Button</span>
        </FwButton>
        <br/> 
        <FwButton
          animation='progress'
          onClick={()=>{
            return ; 
          }} 
          variant='secondary'
        >
          <span>Secondary Button</span>
        </FwButton> 
      </div>
      <br/>
      <div className={styles['suspense']}>
        <Suspense fallback={<Loading size={0.7} theme='dark'/>}>
          <DummyComponent />
        </Suspense>
      </div>

    </div>
  );
};

export default PageContent;