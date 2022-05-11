import React from 'react';
import styles from './PageContent.module.scss';
import FwButton from '../../../utils/templates/Button';
import Loading from '../../Loading';

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
      <Loading />

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