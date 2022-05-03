import React from 'react';
import styles from './Layout.module.scss';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';

const Layout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <PageHeader />
      <PageContent />
      <PageFooter />
    </div>
  );
};

export default Layout;