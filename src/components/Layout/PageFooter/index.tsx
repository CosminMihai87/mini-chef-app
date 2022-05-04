import React from 'react';
import styles from './PageFooter.module.scss';
import linkedInLogo from '../../../assets/images/linked-in-logo.png';
import gitLogo from '../../../assets/images/git-logo.png';
import twitterLogo from '../../../assets/images/twitter-logo.png';
import instagramLogo from '../../../assets/images/instagram-logo.png';
import facebookLogo from '../../../assets/images/facebook-logo.png';
import UseTransitionAnimation from '../../../utils/customHooks/useTransitionAnimation';

interface PageFooterInterface {
  hitBottomOfPage: boolean,
  percentageScrolled: number
}

// eslint-disable-next-line react/destructuring-assignment
const PageFooter: React.FC<PageFooterInterface> = ({hitBottomOfPage, percentageScrolled}) => {
  const currentYear = new Date().getFullYear();

  console.log(percentageScrolled);

  return (
    <UseTransitionAnimation
      defaultStyle={{ 
        display: 'none',
        transform: 'translateX(100%)',
        transition: 'transform 500ms ease-in-out'
      }}
      duration={300}
      show={percentageScrolled>85}
      transitionStyle={{
        entering: {
          display: 'block',
          transform: 'translateX(100%)',
          transition: 'transform 500ms ease-in-out'
        },
        entered: {
          display: 'block',
          transform: 'translateX(0)',
          transition: 'transform 500ms ease-in-out'
        },
        exiting: {
          display: 'block',
          transform: 'translateX(100%)',
          transition: 'transform 500ms ease-in-out'
        },
        exited: {
          display: 'none',
          transform: 'translateX(100%)',
          transition: 'transform 500ms ease-in-out'
        }
      }}
    >
      <div className={styles['page-footer']}>
        <div className={styles.content}>
          <div className={styles.links}>
            <a 
              className={styles.link}
              href='https://linkedin.com/in/cosmin-mihai-62073448'
              target='new'
            > 
              <img 
                alt='LinkedIn Icon placeholder'
                src={linkedInLogo}
              />
            </a>
            <a 
              className={styles.link} 
              href='https://github.com/CosminMihai87'
              target='new'
            > 
              <img 
                alt='Git Icon placeholder'
                src={gitLogo}
              />
            </a>
            <a 
              className={styles.link}
              href=''
            > 
              <img 
                alt='Twitter Icon placeholder'
                src={twitterLogo}
              />
            </a>
            <a 
              className={styles.link}
              href='https://www.instagram.com/cos.min2612' 
              target='new'
            > 
              <img 
                alt='Instagram Icon placeholder'
                src={instagramLogo}
              />
            </a>
            <a 
              className={styles.link}
              href='https://www.facebook.com/mihai.cosmin.37' 
              target='new'
            > 
              <img 
                alt='Facebook Icon placeholder'
                src={facebookLogo}
              />
            </a>
            
          </div>
          <span className={styles.signature}>
            © {currentYear} Cosmin Mihai - <a href='mailto:cosmin.mihai2612@gmail.com'>Contact</a>
          </span>
        </div>
      </div>
    </UseTransitionAnimation>
  );
};

export default PageFooter;