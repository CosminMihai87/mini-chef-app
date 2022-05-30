import {
  FC
} from 'react';
import {
  ThemeType,
  themeType
} from '../../shared/constants';
import styles from './Loading.module.scss';
import loadingAnimationLight from '../../assets/images/loading-light.gif';
import loadingAnimationDark from '../../assets/images/loading-dark.gif';

interface ILoadingProps {
  theme?: themeType
  backgroundColor?: string
  size?: number
}

const Loading: FC<ILoadingProps> = (props) => {
  const { 
    theme = ThemeType.LIGHT,
    backgroundColor = 'transparent',
    size = 1
  } = {...props};

  return (
    <div className={styles['loading']}>
      <img 
        alt='Loading Animation placeholder'
        src={theme===ThemeType.LIGHT ? loadingAnimationLight : loadingAnimationDark}
        style={{
          background: `${backgroundColor}`,
          transform: `scale(${size})`
        }}
      />
    </div>
  );
};

export default Loading;