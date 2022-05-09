import React from 'react';
import styles from './PageHeader.module.scss';
import LoggedInUser from '../../LoggedInUser';
import SideNavigation from '../../SideNavigation';

const PageHeader: React.FC = () => {
  return (
    <div className={styles['page-header']}>
      <SideNavigation />
      <div className={styles['app-details']}>
        <div className={styles['app-name']}> Mini Chef</div>
        <div className={styles['app-description']}> Recipes / Meal Prep Planner / Community </div>
      </div>
      <LoggedInUser />
    </div>
  );
};

export default PageHeader;