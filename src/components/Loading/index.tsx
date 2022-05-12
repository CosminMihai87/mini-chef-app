import React from 'react';
import styles from './Loading.module.scss';
import loadingAnimationLight from '../../assets/images/loading-light.gif';
import loadingAnimationDark from '../../assets/images/loading-dark.gif';

type themeType = 'light' | 'dark';

interface LoadingProps {
  theme?: themeType
  backgroundColor?: string
  size?: number
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { 
    theme = 'light',
    backgroundColor = 'transparent',
    size = 1
  } = {...props};

  return (
    <div className={styles['loading']}>
      <img 
        alt='Loading Animation placeholder'
        src={theme==='light' ? loadingAnimationLight : loadingAnimationDark}
        style={{
          background: `${backgroundColor}`,
          transform: `scale(${size})`
        }}
      />
    </div>
  );
};

export default Loading;