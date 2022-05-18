import {
  FC,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  BaseSyntheticEvent
} from 'react';
import styles from './FwDropdown.module.scss';
import { Dropdown, FormControl } from 'react-bootstrap';
import FwButton from '../../../shared/templates/Button';
import ChevronUpSVG from '../../../assets/images/chevron-up.svg';
import ChevronDownSVG from '../../../assets/images/chevron-down.svg';
import CheckSVG from '../../../assets/images/check.svg';
import addLogo from '../../../assets/images/add-logo.png';
import clearLogo from '../../../assets/images/close-logo.png';
import searchLogo from '../../../assets/images/search-logo.png';

type animationType = 'progress' | 'jello' | 'pulse' | undefined;

interface IFWDropdownProps {
  isDisabled?: boolean,
  id?: string,
  options: IFWDropdownOption[],
  selectedOption: string | undefined,
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>
  animation?: animationType
  variant?: string,
  activateSearch?: boolean
  searchPlaceholder?: string | undefined,
}

interface IFWDropdownSearchProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  nrFound: number,
  searchPlaceholder: string | undefined
}

export interface IFWDropdownOption {
  id: string,
  text: string
}

const FWDropdown: FC<IFWDropdownProps> = (props) => {
  const {
    isDisabled = false,
    id = undefined,
    options,
    selectedOption = props.options[0].id,
    setSelectedOption,
    animation = 'progress',
    variant = 'primary',
    activateSearch = false,
    searchPlaceholder
  } = {...props};
  const [expandedDropdown, setExpandedDropdown] = useState(false);
  const [searchedValue, setSearchedValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleDropdownOptionClick = (e: MouseEvent<HTMLInputElement>) => {
    setSelectedOption(options?.find((opt: IFWDropdownOption) => opt.text=== (e.target as HTMLElement).innerText)?.id);
  };

  const handleDropdownToggleClick = () => {
    if (!isDisabled) {
      setExpandedDropdown(!expandedDropdown);
      setSearchedValue('');
    }
  };

  useEffect(()=>{
    setFilteredOptions(options?.filter((t: IFWDropdownOption)=> t.text.toLowerCase().indexOf(searchedValue.toLowerCase())!==-1));
  },[searchedValue]);

  return (
    <Dropdown
      autoClose='outside'
      className={styles['fw-dropdown']}
      onClick={() => handleDropdownToggleClick()}
    >
      <Dropdown.Toggle
        className={`
          ${styles['fw-dropdown-toggle']}
          ${styles[`${variant}`]}
          ${isDisabled ? `${styles.disabled}` : ''}
          ${styles[`animation-${animation}`]}
        `}
        disabled={isDisabled}
        id={id}
      >
        {(searchedValue!=='' && expandedDropdown)? 'Searching...'  : 
          filteredOptions?.find((t: IFWDropdownOption)=> t.id===selectedOption)?.text }
        {expandedDropdown ? <ChevronUpSVG /> :  <ChevronDownSVG />}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`
          ${styles['fw-dropdown-menu']}
          ${!expandedDropdown ? `${styles.hide}` : ''}
        `}
      >
        {activateSearch && 
          <FWDropdownSearch 
            nrFound={filteredOptions.length}
            searchPlaceholder={searchPlaceholder}
            setValue={setSearchedValue}
            value={searchedValue}
          />
        }
        {filteredOptions?.map((item: IFWDropdownOption) => (
          <Dropdown.Item
            className={`
              ${styles['fw-dropdown-item']}
              ${styles[`${variant}`]}
              ${styles[`animation-${animation}`]}
              ${selectedOption && selectedOption === item.id && styles['fw-dropdown-item-selected']}
            `}
            key={filteredOptions.indexOf(item)}
            onClick={(e: MouseEvent<HTMLInputElement>) => handleDropdownOptionClick(e)}
            tabIndex={expandedDropdown ? 0 : -1}
          >
            {item.text}
            {selectedOption && selectedOption === item.id &&
              <CheckSVG />
            }
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

const FWDropdownSearch: FC<IFWDropdownSearchProps> = (props) => {
  const {
    value = '',
    setValue,
    nrFound = 0,
    searchPlaceholder = 'Type to filter...'
  } = {...props};
  const [buttonAction, setButtonAction] = useState('Search');
  const dropdownSearchRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setButtonAction(nrFound > 0? (value.length > 0? 'Clear': 'Search') : 'Add');
  },[nrFound]);

  useEffect(()=>{
    dropdownSearchRef?.current?.focus();
  });

  const handleSearchButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    const action = (e.target as HTMLInputElement).alt.split(' ')[0];
    if (action === 'Clear') {
      setValue(''); 
    } else if ( action === 'Add') {
      setValue('');
      return;
    } else {
      return;
    }
  };

  return(
    <div className={styles['fw-dropdown-search']}>
      <FormControl
        autoFocus
        className={styles['fw-dropdown-search-area']}
        onChange={(e: BaseSyntheticEvent) => setValue((e.target.value as string))}
        placeholder={searchPlaceholder}
        ref={dropdownSearchRef}
        value={value}
      />
      <div className={styles['fw-dropdown-findings']}>
        <span>
          *{nrFound}
        </span>
      </div>
      <div className={styles['fw-dropdown-button']}>
        <FwButton
          animation='progress'
          onClick={(e: MouseEvent<HTMLButtonElement>) => handleSearchButtonClick(e)}
          tooltipText={buttonAction}
          tooltipTextPlacement='left'
          variant='secondary'
        >
          <img 
            alt={`${buttonAction} Icon`}
            src={buttonAction === 'Search'? searchLogo : buttonAction === 'Add'? addLogo : clearLogo}
          />
        </FwButton>
      </div>
    </div>
  );
};

export default FWDropdown;