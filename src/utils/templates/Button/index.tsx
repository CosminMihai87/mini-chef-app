import {
  FC,
  RefObject,
  useRef,
  MouseEvent
} from 'react';
import { Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import styles from './FwButton.module.scss';
 
type buttonType = 'button' | 'submit' | 'reset' | undefined;

type T = HTMLElement;

interface FwButtonProps {
  isDisabled?: boolean,
  id?: string,
  innerRef?: RefObject<T>,
  onClick: (e: MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  tooltipText?: string,
  tooltipTextPlacement?: string,
  type?: buttonType,
  variant?: string,
  children: any
}

const FwButton:FC<FwButtonProps> = (props) => {
  const {
    isDisabled = false,
    id = undefined,
    innerRef = undefined,
    onClick,
    tooltipText = '',
    tooltipTextPlacement = '',
    type = 'button',
    variant = 'primary',
    children = undefined
  } = {...props};
  const ref = useRef<RefObject<T> | undefined>(innerRef? innerRef : undefined);

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick(e);
    ReactTooltip.hide(ref.current as HTMLElement | undefined);
  };

  return (
    <>
      <Button
        className={`
          ${styles['fw-button']} 
          ${styles[`${variant}`]} 
          ${isDisabled? styles['is-disabled']: '' }
        `}
        data-delay-hide='50'
        data-delay-show='300'
        data-for={`${id}_tooltip`}
        data-place={tooltipTextPlacement}
        data-tip={tooltipText}
        data-type='dark'
        disabled={isDisabled}
        id={id}
        onClick={(e: any) => handleBtnClick(e)}
        // ref={ref}
        type={type}
      >
        {children}
      </Button>
      <ReactTooltip
        className={styles['fw-button-tooltip']}
        id={`${id}_tooltip`}
      />
    </>
  );
};

export default FwButton;