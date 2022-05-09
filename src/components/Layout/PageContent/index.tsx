import React from 'react';
import styles from './PageContent.module.scss';
import FwButton from '../../../utils/templates/Button';

const PageContent: React.FC = () => {
  return (
    <div className={styles['page-content']}>
      <FwButton
        animation='progress'
        onClick={()=>{
          return ; 
        }} 
        variant='primary'
      >
        <span>Test Button</span>
      </FwButton>

      {/* <h1>a</h1>
      <h1>a</h1>     
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1>
      <h1>a</h1> */}


    </div>
  );
};

export default PageContent;