import {
  FC,
  RefObject,
  useRef,
  MouseEvent,
  MutableRefObject
} from 'react';
import { Button } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import styles from './FwButton.module.scss';
 
type buttonType = 'button' | 'submit' | 'reset' | undefined;
type animationType = 'progress' | 'jello' | 'pulse' | undefined;

interface FwButtonProps {
  isDisabled?: boolean,
  id?: string,
  innerRef?: MutableRefObject<RefObject<HTMLButtonElement> | null>,
  onClick: (e: MouseEvent) => void,
  tooltipText?: string,
  tooltipTextPlacement?: string,
  tooltipType?: string,
  type?: buttonType,
  variant?: string,
  children: React.ReactElement<HTMLParagraphElement | HTMLHeadElement>
  animation?: animationType
}

const FwButton:FC<FwButtonProps> = (props) => {
  const {
    isDisabled = false,
    id = undefined,
    innerRef = null,
    onClick,
    tooltipText = '',
    tooltipTextPlacement = 'bottom',
    tooltipType = 'dark',
    type = 'button',
    variant = 'primary',
    animation = 'progress',
    children = undefined,
  } = {...props};
  const ref = useRef<HTMLButtonElement>(innerRef as HTMLButtonElement | null);
  const isChildAnImage = children?.type === 'img';

  const handleBtnClick = (e: MouseEvent) => {
    onClick(e);
    ReactTooltip.hide(ref.current as Element | undefined);
  };

  return (
    <>
      <Button
        className={`
          ${styles['fw-button']}
          ${styles[`${variant}`]}
          ${isDisabled? styles['is-disabled']: ''}
          ${styles[`animation-${animation}`]} 
        `}
        data-delay-hide='50'
        data-delay-show='300'
        data-for={`${id}_tooltip`}
        data-place={tooltipTextPlacement}
        data-tip={tooltipText}
        data-type={tooltipType}
        disabled={isDisabled}
        id={id}
        onClick={(e: MouseEvent) => handleBtnClick(e)}
        ref={ref}
        style={isChildAnImage? {
          borderRadius: '50%',
          padding: '0.5em'
        }:{}}
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