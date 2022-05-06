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
  const displayFooter = percentageScrolled>=80 || hitBottomOfPage;

  return ( 
    <div className={`${styles['page-footer']} ${displayFooter && styles['animation']}`}>
      <UseTransitionAnimation
        className={styles['transition-wrapper']}
        defaultStyle={{ 
          opacity: 0,
          visibility: 'hidden'
        }}
        delay={0}
        show={displayFooter}
        transitionStyle={{
          entering: {
            opacity: 1,
            visibility: 'visible',
            transform: `translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transition: 'all 1000ms ease-in-out',
          },
          entered: {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateY(0)',
            transition: 'all 1000ms ease-in-out',
          },
          exiting: {
            opacity: 0,
            visibility: 'visible',
            transform: `translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transition: 'all 1000ms ease-in-out',
          },
          exited: {
            opacity: 0,
            visibility: 'hidden',
            transform:`translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transition: 'all 1000ms ease-in-out',
          }
        }}
      >
        <div className={styles.content}>
          <div className={styles.links}>
            <a
              className={`${styles.link} ${displayFooter && styles.animation}`}
              href='https://linkedin.com/in/cosmin-mihai-62073448'
              target='new'
            > 
              <img 
                alt='LinkedIn Icon placeholder'
                src={linkedInLogo}
              />
            </a>
            <a 
              className={`${styles.link} ${displayFooter && styles.animation}`}
              href='https://github.com/CosminMihai87'
              target='new'
            > 
              <img 
                alt='Git Icon placeholder'
                src={gitLogo}
              />
            </a>
            <a 
              className={`${styles.link} ${displayFooter && styles.animation}`}
              href=''
            > 
              <img 
                alt='Twitter Icon placeholder'
                src={twitterLogo}
              />
            </a>
            <a 
              className={`${styles.link} ${displayFooter && styles.animation}`}
              href='https://www.instagram.com/cos.min2612' 
              target='new'
            > 
              <img 
                alt='Instagram Icon placeholder'
                src={instagramLogo}
              />
            </a>
            <a 
              className={`${styles.link} ${displayFooter && styles.animation}`}
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
      </UseTransitionAnimation>
    </div>
  );
};

export default PageFooter;