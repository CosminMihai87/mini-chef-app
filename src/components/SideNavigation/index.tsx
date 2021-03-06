import React, { 
  useRef,
  RefObject,
  useState,
  useEffect
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './SideNavigation.module.scss';
import sideNavOpenLogo from '../../assets/images/side-navigation/side-navigation-open-logo.png';
import sideNavClosedLogo from '../../assets/images/side-navigation/side-navigation-closed-logo.png';
import recipeBookLogo from '../../assets/images/side-navigation/recipe-book-logo.png';
import weeklyPlanLogo from '../../assets/images/side-navigation/weekly-plan-logo.png';
import shoppingCartLogo from '../../assets/images/side-navigation/shopping-cart-logo.png';
import calendarLogo from '../../assets/images/side-navigation/calendar-logo.png';
import fridgeLogo from '../../assets/images/side-navigation/fridge-logo.png';
import FwButton from '../../shared/templates/Button';
import {
  TemplateVariant,
  AnimationType
} from '../../shared/constants';
import UseTransitionAnimation from '../../shared/customHooks/useTransitionAnimation';

const SideNavigation: React.FC = () => {
  const navigate = useNavigate();
  const btnSideNavigationRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const btnRecipeBookRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnWeeklyPlanRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnShoppingCartRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnCalendarRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnFridgeRef = useRef<RefObject<HTMLButtonElement> | null>(null);

  useEffect(()=>{
    !navOpen && navigate('/', { replace: true });
  },[navOpen]);

  return (
    <div className={styles['side-navigation']}>
      <FwButton
        animation={navOpen? AnimationType.PROGRESS : AnimationType.PULSE}
        id='btnSideNavigation'
        innerRef={btnSideNavigationRef}
        onClick={()=>{
          return setNavOpen(!navOpen); 
        }}
        tooltipText={navOpen? 'Close' : 'Navigation'}
        tooltipTextPlacement='right'
        variant={TemplateVariant.SECONDARY}
      >
        <img 
          alt='Logged in Burger Icon placeholder'
          src={navOpen? sideNavOpenLogo: sideNavClosedLogo}
        />
      </FwButton>
      <UseTransitionAnimation
        className={styles['transition-wrapper']}
        defaultStyle={{
          display: 'none'
        }}
        delay={0}
        show={navOpen}
        transitionStyle={{
          entering: {
            display: 'block',
            transform: 'translateX(-100px)',
            transition: 'all 500ms ease-in-out',
          },
          entered: {
            display: 'block',
            transform: 'translateX(0)',
            transition: 'all 500ms ease-in-out',
          },
          exiting: {
            display: 'block',
            transform: 'translateX(-100px)',
            transition: 'all 500ms ease-in-out',
          },
          exited: {
            display: 'block',
            transform:'translateX(-100px)',
            transition: 'all 500ms ease-in-out',
          }
        }}
      >
        <div className={styles['side-navigation-panel']}>
          <div className={styles['side-navigation-button']}>
            <Link to='/recipe-book'>
              <FwButton
                animation={AnimationType.PROGRESS}
                id='btnRecipeBook'
                innerRef={btnRecipeBookRef}
                onClick={()=>{
                  return;
                }}
                tooltipText='Recipe Book'
                tooltipTextPlacement='top'
                variant={TemplateVariant.SECONDARY}
              >
                <img 
                  alt='Recipe Book Icon placeholder'
                  src={recipeBookLogo}
                />
              </FwButton>
            </Link>
          </div>
          <div className={styles['side-navigation-button']}>
            <Link to='/weekly-plan'>
              <FwButton
                animation={AnimationType.PROGRESS}
                id='btnWeeklyPlan'
                innerRef={btnWeeklyPlanRef}
                onClick={()=>{
                  return;
                }}
                tooltipText='Weekly Plan'
                tooltipTextPlacement='top'
                variant={TemplateVariant.SECONDARY}
              >
                <img 
                  alt='Weekly Plan Icon placeholder'
                  src={weeklyPlanLogo}
                />
              </FwButton>
            </Link>
          </div>
          <div className={styles['side-navigation-button']}>
            <Link to='/shopping-card'>
              <FwButton
                animation={AnimationType.PROGRESS}
                id='btnShoppingCart'
                innerRef={btnShoppingCartRef}
                onClick={()=>{
                  return;
                }}
                tooltipText='Shopping Cart'
                tooltipTextPlacement='top'
                variant={TemplateVariant.SECONDARY}
              >
                <img 
                  alt='Shopping Cart Icon placeholder'
                  src={shoppingCartLogo}
                />
              </FwButton>
            </Link>
          </div>
          <div className={styles['side-navigation-button']}>
            <Link to='/calendar'>
              <FwButton
                animation={AnimationType.PROGRESS}
                id='btnCallendar'
                innerRef={btnCalendarRef}
                onClick={()=>{
                  return;
                }}
                tooltipText='Calendar'
                tooltipTextPlacement='top'
                variant={TemplateVariant.SECONDARY}
              >
                <img 
                  alt='Calendar Icon placeholder'
                  src={calendarLogo}
                />
              </FwButton>
            </Link>
          </div>
          <div className={styles['side-navigation-button']}>
            <Link to='/fridge'>
              <FwButton
                animation={AnimationType.PROGRESS}
                id='btnFridge'
                innerRef={btnFridgeRef}
                onClick={()=>{
                  return;
                }}
                tooltipText='Fridge'
                tooltipTextPlacement='top'
                variant={TemplateVariant.SECONDARY}
              >
                <img 
                  alt='Fridge Icon placeholder'
                  src={fridgeLogo}
                />
              </FwButton>
            </Link>
          </div>
        </div> 
      </UseTransitionAnimation>
    </div>
  );
};

export default SideNavigation;