import React, {
  useRef,
  RefObject,
  useEffect,
  useState
} from 'react';
import { useLocation } from 'react-router-dom';
import styles from './PageFooter.module.scss';
import linkedInLogo from '../../../assets/images/social-media/linked-in-logo.png';
import gitLogo from '../../../assets/images/social-media/git-logo.png';
import twitterLogo from '../../../assets/images/social-media/twitter-logo.png';
import instagramLogo from '../../../assets/images/social-media/instagram-logo.png';
import facebookLogo from '../../../assets/images/social-media/facebook-logo.png';
import UseTransitionAnimation from '../../../shared/customHooks/useTransitionAnimation';
import FwButton from '../../../shared/templates/Button';
import {
  LINKED_IN_URL,
  GIT_URL,
  INSTAGRAM_URL,
  FACEBOOK_URL
} from '../../../shared/constants';

interface PageFooterInterface {
  hitBottomOfPage: boolean,
  percentageScrolled: number
}

const PageFooter: React.FC<PageFooterInterface> = (props) => {
  const { 
    hitBottomOfPage, 
    percentageScrolled 
  } = {...props};
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const [displayFooter, setDisplayFooter] = useState(true);
  const btnLinkedIn = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnGit = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnTwitter = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnInstagram = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnFacebook = useRef<RefObject<HTMLButtonElement> | null>(null);

  useEffect(()=>{
    setDisplayFooter(percentageScrolled>=80 || hitBottomOfPage);
  },[percentageScrolled, hitBottomOfPage]);
  
  useEffect(()=>{
    setDisplayFooter(true);
  },[location]);


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
            transform: 'translateX(100%)',
            transition: 'all 1000ms ease-in-out'
          },
          entered: {
            opacity: 1,
            visibility: 'visible',
            transform: 'translateX(0)',
            transition: 'all 1000ms ease-in-out'
          },
          exiting: {
            opacity: 0,
            visibility: 'visible',
            transform: 'translateX(100%)',
            transition: 'all 1000ms ease-in-out'
          },
          exited: {
            opacity: 0,
            visibility: 'hidden',
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
              © {currentYear} Cosmin Mihai
            </span>
          </div>
        </div>
      </UseTransitionAnimation>
    </div>
  );
};

export default PageFooter;