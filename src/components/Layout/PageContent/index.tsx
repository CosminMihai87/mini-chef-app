import React from 'react';
import styles from './PageContent.module.scss';
import SideNavigation from '../../SideNavigation';

const PageContent: React.FC = () => {
  return (
    <div className={styles['page-content']}>
      <SideNavigation />
      <h2> Lorem Ipsum </h2>
      <span>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry`&apos;s standard dummy text ever since the 1500s,
      when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into 
      electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
      and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
 
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
      <h1>a</h1>
      <h1>a</h1>  */}

      </span>
    </div>
  );
};

export default PageContent;