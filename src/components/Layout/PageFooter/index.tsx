import React from 'react';
import styles from './PageFooter.module.scss';

const PageFooter: React.FC = () => {
  return (
    <div className={styles['page-footer']}>
      <h2>footer</h2>
    </div>
  );
};

export default PageFooter;