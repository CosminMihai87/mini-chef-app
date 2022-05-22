import {
  FC,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  BaseSyntheticEvent
} from 'react';
import styles from './FwTextarea.module.scss';
import { FormControl } from 'react-bootstrap';
import FwButton from '../../../shared/templates/Button';
import clearLogo from '../../../assets/images/close-logo.png';
import searchLogo from '../../../assets/images/search-logo.png';

type textAreaVariant = 'default' | 'search';

export interface IFwTextareaProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  nrFound?: number,
  placeholder?: string | undefined
  variant?: textAreaVariant
}

const FwTextarea: FC<IFwTextareaProps> = (props) => {
  const {
    value = '',
    setValue,
    nrFound = 0,
    placeholder = 'Type to filter...',
    variant = 'default'
  } = {...props};
  const [buttonAction, setButtonAction] = useState('Search');
  const textareaRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    variant==='search' && setButtonAction(value.length > 0 ? 'Clear': 'Search');
  },[value, variant]);

  useEffect(()=>{
    variant==='search' && textareaRef?.current?.focus();
  },[variant]);

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    value.length > 0 && setValue('');
  };

  return(
    <div className={styles['fw-textarea']}>
      <FormControl
        autoFocus
        className={styles['fw-textarea-box']}
        onChange={(e: BaseSyntheticEvent) => setValue((e.target.value as string))}
        placeholder={placeholder}
        ref={textareaRef}
        value={value}
      />
      {variant==='search' && 
        <div className={styles['fw-textarea-findings']}>
          <span>
            *{nrFound}
          </span>
        </div>
      }
      {variant==='search' && 
        <div className={styles['fw-textarea-button']}>
          <FwButton
            animation='progress'
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleButtonClick(e)}
            tooltipText={buttonAction}
            tooltipTextPlacement='left'
            variant='secondary'
          >
            <img 
              alt={`${buttonAction} Icon`}
              src={buttonAction === 'Search'? searchLogo : clearLogo}
            />
          </FwButton>
        </div>
      }
    </div>
  );
};

export default FwTextarea;