import React from 'react';
import styles from './PageHeader.module.scss';
import LoggedInUser from '../../LoggedInUser';

const PageHeader: React.FC = () => {
  return (
    <div className={styles['page-header']}>
      <LoggedInUser />
    </div>
  );
};

export default PageHeader;