import React, { 
  useRef,
  RefObject,
  useState
} from 'react';
import styles from './SideNavigation.module.scss';
import sideNavOpenLogo from '../../assets/images/side-navigation/side-navigation-open-logo.png';
import sideNavClosedLogo from '../../assets/images/side-navigation/side-navigation-closed-logo.png';
import recipeBookLogo from '../../assets/images/side-navigation/recipe-book-logo.png';
import weeklyPlanLogo from '../../assets/images/side-navigation/weekly-plan-logo.png';
import shoppingCartLogo from '../../assets/images/side-navigation/shopping-cart-logo.png';
import calendarLogo from '../../assets/images/side-navigation/calendar-logo.png';
import fridgeLogo from '../../assets/images/side-navigation/fridge-logo.png';
import FwButton from '../../utils/templates/Button';
import UseTransitionAnimation from '../../utils/customHooks/useTransitionAnimation';

const SideNavigation: React.FC = () => {
  const btnSideNavigationRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const [navOpen, setNavOpen] = useState(false);
  const btnRecipeBookRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnWeeklyPlanRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnShoppingCartRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnCalendarRef = useRef<RefObject<HTMLButtonElement> | null>(null);
  const btnFridgeRef = useRef<RefObject<HTMLButtonElement> | null>(null);

  return (
    <div className={styles['side-navigation']}>
      <FwButton
        animation={navOpen? 'progress' : 'pulse'}
        id='btnSideNavigation'
        innerRef={btnSideNavigationRef}
        onClick={()=>{
          return setNavOpen(!navOpen); 
        }}
        tooltipText={navOpen? 'Close' : 'Side Navigation'}
        variant='secondary'
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
            <FwButton
              animation='progress'
              id='btnRecipeBook'
              innerRef={btnRecipeBookRef}
              onClick={()=>{
                return;
              }}
              tooltipText='Recipe Book'
              tooltipTextPlacement='right'
              variant='secondary'
            >
              <img 
                alt='Recipe Book Icon placeholder'
                src={recipeBookLogo}
              />
            </FwButton>
          </div>
          <div className={styles['side-navigation-button']}>
            <FwButton
              animation='progress'
              id='btnWeeklyPlan'
              innerRef={btnWeeklyPlanRef}
              onClick={()=>{
                return;
              }}
              tooltipText='Weekly Plan'
              tooltipTextPlacement='right'
              variant='secondary'
            >
              <img 
                alt='Weekly Plan Icon placeholder'
                src={weeklyPlanLogo}
              />
            </FwButton>
          </div>
          <div className={styles['side-navigation-button']}>
            <FwButton
              animation='progress'
              id='btnShoppingCart'
              innerRef={btnShoppingCartRef}
              onClick={()=>{
                return;
              }}
              tooltipText='Shopping Cart'
              tooltipTextPlacement='right'
              variant='secondary'
            >
              <img 
                alt='Shopping Cart Icon placeholder'
                src={shoppingCartLogo}
              />
            </FwButton>
          </div>
          <div className={styles['side-navigation-button']}>
            <FwButton
              animation='progress'
              id='btnCallendar'
              innerRef={btnCalendarRef}
              onClick={()=>{
                return;
              }}
              tooltipText='Calendar'
              tooltipTextPlacement='right'
              variant='secondary'
            >
              <img 
                alt='Calendar Icon placeholder'
                src={calendarLogo}
              />
            </FwButton>
          </div>
          <div className={styles['side-navigation-button']}>
            <FwButton
              animation='progress'
              id='btnFridge'
              innerRef={btnFridgeRef}
              onClick={()=>{
                return;
              }}
              tooltipText='Fridge'
              tooltipTextPlacement='right'
              variant='secondary'
            >
              <img 
                alt='Fridge Icon placeholder'
                src={fridgeLogo}
              />
            </FwButton>
          </div>
        </div> 
      </UseTransitionAnimation>
    </div>
  );
};

export default SideNavigation;