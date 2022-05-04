import React, { useEffect, useState } from 'react';
import styles from './Layout.module.scss';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import UseTransitionAnimation from '../../utils/customHooks/useTransitionAnimation';

const Layout: React.FC = () => {
  const [displayComponent , setDisplayComponent ] = useState(true);

  useEffect(() => {
    setTimeout(() => setDisplayComponent(false), 2000);
  }, []);

  return (
    <div className={styles.layout}>
      <PageHeader />
      <PageContent />
      <UseTransitionAnimation
        defaultStyle={{ 
          display: 'none',
          transform: 'translateY(100%)',
          transition: 'transform 500ms ease-in-out'
        }}
        duration={500}
        show={displayComponent}
        transitionStyle={{
          entering: {
            display: 'block',
            transform: 'translateY(100%)',
            transition: 'transform 500ms ease-in-out'
          },
          entered: {
            display: 'block',
            transform: 'translateY(0)',
            transition: 'transform 500ms ease-in-out'
          },
          exiting: {
            display: 'block',
            transform: 'translateY(100%)',
            transition: 'transform 500ms ease-in-out'
          },
          exited: {
            display: 'none',
            transform: 'translateY(100%)',
            transition: 'transform 500ms ease-in-out'
          }
        }}
      >
        <PageFooter />
      </UseTransitionAnimation>
    </div>
  );
};

export default Layout;