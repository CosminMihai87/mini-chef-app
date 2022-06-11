import {
  FC,
  RefObject,
  useRef,
  MouseEvent,
  MutableRefObject
} from 'react';
import { Button } from 'react-bootstrap';
import { 
  ButtonType,
  buttonType,
  TemplateVariant,
  templateVariant,
  AnimationType,
  animationType
} from '../../constants';
import ReactTooltip from 'react-tooltip';
import styles from './FwButton.module.scss';

interface FwButtonProps {
  isDisabled?: boolean,
  id?: string,
  innerRef?: MutableRefObject<RefObject<HTMLButtonElement> | null>,
  onClick: (e: MouseEvent<HTMLButtonElement>) => void,
  tooltipText?: string,
  tooltipTextPlacement?: string,
  tooltipType?: string,
  type?: buttonType,
  variant?: templateVariant,
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
    type = ButtonType.BUTTON,
    variant = TemplateVariant.PRIMARY,
    animation = AnimationType.PULSE,
    children = undefined,
  } = {...props};
  const ref = useRef<HTMLButtonElement>(innerRef as HTMLButtonElement | null);
  const isChildAnImage = children?.type === 'img';

  const handleBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
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
          ${isDisabled? '' : styles[`animation-${animation}`]}
        `}
        data-delay-hide='50'
        data-delay-show='300'
        data-for={`${id}_tooltip`}
        data-place={tooltipTextPlacement}
        data-tip={tooltipText}
        data-type={tooltipType}
        disabled={isDisabled}
        id={id}
        onClick={(e: MouseEvent<HTMLButtonElement>) => handleBtnClick(e)}
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