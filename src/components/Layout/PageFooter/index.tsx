import React, {
  useRef,
  RefObject
} from 'react';
import styles from './PageFooter.module.scss';
import linkedInLogo from '../../../assets/images/social-media/linked-in-logo.png';
import gitLogo from '../../../assets/images/social-media/git-logo.png';
import twitterLogo from '../../../assets/images/social-media/twitter-logo.png';
import instagramLogo from '../../../assets/images/social-media/instagram-logo.png';
import facebookLogo from '../../../assets/images/social-media/facebook-logo.png';
import UseTransitionAnimation from '../../../utils/customHooks/useTransitionAnimation';
import FwButton from '../../../utils/templates/Button';
import {
  LINKED_IN_URL,
  GIT_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL
} from '../../../utils/constants';

interface PageFooterInterface {
  hitBottomOfPage: boolean,
  percentageScrolled: number
}

// eslint-disable-next-line react/destructuring-assignment
const PageFooter: React.FC<PageFooterInterface> = ({hitBottomOfPage, percentageScrolled}) => {
  const currentYear = new Date().getFullYear();
  const displayFooter = percentageScrolled>=80 || hitBottomOfPage;
  const btnLinkedIn = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnGit = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnTwitter = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnInstagram = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnFacebook = useRef<RefObject<HTMLButtonElement> | null>(null);

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
            // transform: `translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transform: 'translateX(100%)',
            transition: 'all 1000ms ease-in-out'
          },
          entered: {
            opacity: 1,
            visibility: 'visible',
            // transform: 'translateY(0)',
            transform: 'translateX(0)',
            transition: 'all 1000ms ease-in-out'
          },
          exiting: {
            opacity: 0,
            visibility: 'visible',
            // transform: `translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transform: 'translateX(100%)',
            transition: 'all 1000ms ease-in-out'
          },
          exited: {
            opacity: 0,
            visibility: 'hidden',
            // transform:`translateY(${percentageScrolled ===0 ? 100 : 50}%)`,
            transform: 'translateX(100%)',
            transition: 'all 1000ms ease-in-out'
          }
        }}
      >
        <div className={styles.content}>
          <div className={styles.links}>
            <FwButton
              animation='jello'
              id='btnLinkedInID'
              innerRef={btnLinkedIn}
              onClick={()=>{
                window.open(LINKED_IN_URL,'_blank');
              }}
              tooltipText='LinkedIn'
              variant='secondary'
            >
              <img 
                alt='LinkedIn Icon placeholder'
                src={linkedInLogo}
              />
            </FwButton>
            <FwButton
              animation='jello'
              id='btnGitID'
              innerRef={btnGit}
              onClick={()=>{
                window.open(GIT_URL,'_blank');
              }}
              tooltipText='Git'
              variant='secondary'
            >
              <img 
                alt='Git Icon placeholder'
                src={gitLogo}
              />
            </FwButton>
            <FwButton
              animation='jello'
              id='btTwitterID'
              innerRef={btnTwitter}
              onClick={()=>{
                return;
              }}
              tooltipText='Twitter'
              variant='secondary'
            >
              <img 
                alt='Twitter Icon placeholder'
                src={twitterLogo}
              />
            </FwButton>
            <FwButton
              animation='jello'
              id='btInstagramID'
              innerRef={btnInstagram}
              onClick={()=>{
                window.open(INSTAGRAM_URL,'_blank');
              }}
              tooltipText='Instagram'
              variant='secondary'
            >
              <img 
                alt='Instagram Icon placeholder'
                src={instagramLogo}
              />
            </FwButton>
            <FwButton
              animation='jello'
              id='btFacebookID'
              innerRef={btnFacebook}
              onClick={()=>{
                window.open(FACEBOOK_URL,'_blank');
              }}
              tooltipText='Facebook'
              variant='secondary'
            >
              <img 
                alt='Facebook Icon placeholder'
                src={facebookLogo}
              />
            </FwButton>
          </div>
          <div className={styles.signature}>
            <span>
              © {currentYear} Cosmin Mihai - <a href='mailto:cosmin.mihai2612@gmail.com'>Contact</a>
            </span>
          </div>
        </div>
      </UseTransitionAnimation>
    </div>
  );
};

export default PageFooter;