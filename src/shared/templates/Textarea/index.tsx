import {
  FC,
  useState,
  useRef,
  useEffect,
  Dispatch,
  SetStateAction,
  MouseEvent,
  BaseSyntheticEvent,
  RefObject
} from 'react';
import styles from './FwTextarea.module.scss';
import { FormControl } from 'react-bootstrap';
import FwButton from '../../../shared/templates/Button';
import ClearLogo from '../../../assets/images/close-logo.svg';
import SearchLogo from '../../../assets/images/search-logo.svg';

type textAreaVariant = 'default' | 'search' | 'dropdown-search';

export interface IFwTextareaProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  nrFound?: number,
  placeholder?: string | undefined
  variant?: textAreaVariant,
  innerRef?: RefObject<HTMLInputElement> | null,
}

const FwTextarea: FC<IFwTextareaProps> = (props) => {
  const {
    value = '',
    setValue,
    innerRef = null,
    nrFound = 0,
    placeholder = 'Type to filter...',
    variant = 'default'
  } = {...props};
  const [buttonAction, setButtonAction] = useState('Search');
  const textareaRef = useRef<HTMLInputElement>(innerRef as HTMLInputElement | null);

  useEffect(()=>{
    variant.indexOf('search')!==-1 && setButtonAction(value.length > 0 ? 'Clear': 'Search');
  },[value, variant]);

  useEffect(()=>{
    variant.indexOf('search')!==-1 && textareaRef?.current?.focus();
  },[variant]);

  useEffect(()=>{
    variant==='dropdown-search' && textareaRef?.current?.focus();
  });

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
      {variant.indexOf('search')!==-1 && 
        <div className={styles['fw-textarea-findings']}>
          <span>
            *{nrFound}
          </span>
        </div>
      }
      {variant.indexOf('search')!==-1 && 
        <div className={`
          ${styles['fw-textarea-button']}
          ${styles[variant]}
        `}>
          <FwButton
            animation='progress'
            onClick={(e: MouseEvent<HTMLButtonElement>) => handleButtonClick(e)}
            variant='secondary'
          >
            {buttonAction === 'Search'? 
              <SearchLogo 
                height='30px'
                width='30px'
              /> : 
              <ClearLogo
                height='30px'
                width='30px'
              />
            } 
          </FwButton>
        </div>
      }
    </div>
  );
};

export default FwTextarea;