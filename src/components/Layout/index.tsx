import React, {
  useRef
} from 'react';
import styles from './Layout.module.scss';
import PageContent from './PageContent';
import PageFooter from './PageFooter';
import PageHeader from './PageHeader';
import UseScrollPosition from '../../shared/customHooks/useScrollPosition';

const Layout: React.FC = () => {
  const pageLayoutRef = useRef<HTMLHeadingElement>(null);
  const scrollData = UseScrollPosition(pageLayoutRef);
  
  return (
    <div className={styles.layout} ref={pageLayoutRef}>
      <PageHeader />
      <PageContent />
      <PageFooter 
        hitBottomOfPage={scrollData?.hitBottomOfPage} 
        percentageScrolled={scrollData?.percentageScrolled} 
      />
    </div>
  );
};

export default Layout;