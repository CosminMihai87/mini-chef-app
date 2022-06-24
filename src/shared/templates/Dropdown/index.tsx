import {
  FC,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  BaseSyntheticEvent,
  useRef
} from 'react';
import styles from './FwDropdown.module.scss';
import { 
  Field,
  FieldProps
} from 'formik';
import { 
  Dropdown, 
  FormGroup, 
  FormControl, 
  FormLabel 
} from 'react-bootstrap';
import { 
  DropdownType,
  dropdownType,
  templateVariant,
  TemplateVariant,
  animationType,
  AnimationType,
} from '../../constants';
import FwButton from '../Button';
import ChevronUpLogo from '../../../assets/images/chevron-up.svg';
import ChevronDownLogo from '../../../assets/images/chevron-down.svg';
import CheckLogo from '../../../assets/images/check-logo.svg';
import ClearLogo from '../../../assets/images/close-logo.svg';
import SearchLogo from '../../../assets/images/search-logo.svg';

interface IFwDropdownProps {
  dropdownType?: dropdownType,
  label?: string,
  name?: string,
  id?: string,
  options: IFwDropdownOption[] | undefined,
  defaultValue?: string,
  isDisabled?: boolean,
  animation?: animationType
  variant?: templateVariant,
  searchPlaceholder?: string,
}

export interface IFwDropdownOption {
  key: string,
  value: string
}

export interface IFwDropdownSearchProps {
  value: string,
  setValue: Dispatch<SetStateAction<string>>,
  placeholder: string,
}

const FwDropdown: FC<IFwDropdownProps> = (props) => {
  const {
    dropdownType = DropdownType.SEARCH,
    label = '',
    name,
    id = undefined,
    options,
    defaultValue = '',
    isDisabled = false,
    animation = AnimationType.PROGRESS,
    variant = TemplateVariant.PRIMARY,
    searchPlaceholder = 'Type to filter...'
  } = {...props};
  const [expandedDropdown, setExpandedDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState(defaultValue);
  const [searchedValue, setSearchedValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);

  const handleDropdownOptionClick = (e: MouseEvent<HTMLInputElement>, form: any) => {
    setSelectedOption(options?.find((opt: IFwDropdownOption) => opt.value === (e.target as HTMLElement).innerText)?.value as SetStateAction<string>);
    form.setFieldValue(name, options?.find((opt: IFwDropdownOption) => opt.value === (e.target as HTMLElement).innerText)?.value as SetStateAction<string>);
  };

  const handleDropdownBlur = (e: any, field: any) => {
    field.onBlur(e);
  };

  const handleDropdownToggleClick = () => {
    if (!isDisabled) {
      setExpandedDropdown(!expandedDropdown);
      setSearchedValue('');
    }
  };

  useEffect(()=>{
    setFilteredOptions(options?.filter((t: IFwDropdownOption)=> t.value.toLowerCase().indexOf(searchedValue.toLowerCase())!==-1));
  },[searchedValue]);

  useEffect(()=>{
    setSelectedOption(defaultValue);
  },[defaultValue]);
  
  return(
    <div className={styles['fw-form-control']}>
      <Field name={name}>
        {(props: FieldProps) => {
          const { 
            field,
            form,
            meta 
          } = props;
          return (
            <FormGroup className={styles['fw-dropdown-group']}>
              {label && 
                <FormLabel 
                  className={styles['fw-dropdown-label']}
                  htmlFor={name}
                >
                  {label}
                </FormLabel>
              }
              <Dropdown
                autoClose='inside'
                className={styles['fw-dropdown']}
                id={id}
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
                  {expandedDropdown ? 
                    searchedValue!=='' ? 
                      'Searching...' :
                      'Please select'
                    : selectedOption!=='' ? 
                      filteredOptions?.find((t: IFwDropdownOption)=> t.value===selectedOption)?.value : 
                      'Please select'
                  }
                  <div className={styles['fw-dropdown-toggle-logos']}>
                    {expandedDropdown ?
                      <ChevronUpLogo /> :  
                      <ChevronDownLogo />
                    }
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu
                  className={`
                    ${styles['fw-dropdown-menu']}
                    ${!expandedDropdown ? `${styles.hide}` : ''}
                  `}
                >
                  {dropdownType==='search' &&
                    <div className={styles['fw-dropdown-search']}>
                      <FwDropdownSearch
                        placeholder={searchPlaceholder}
                        setValue={setSearchedValue}
                        value={searchedValue}
                      />
                    </div>
                  }
                  {filteredOptions?.map((item: IFwDropdownOption) => (
                    <Dropdown.Item
                      className={`
                        ${styles['fw-dropdown-item']}
                        ${styles[`${variant}`]}
                        ${styles[`animation-${animation}`]}
                        ${selectedOption!=='' && selectedOption === item.key && styles['fw-dropdown-item-selected']}
                      `}
                      key={filteredOptions.indexOf(item)}
                      name={name}
                      onBlur={(e: any) => handleDropdownBlur(e, field)}
                      onClick={(e: MouseEvent<HTMLInputElement>) => handleDropdownOptionClick(e, form)}
                      tabIndex={expandedDropdown ? 0 : -1}
                    >
                      {item.value}
                      {selectedOption!=='' && selectedOption === item.value &&
                        <CheckLogo />
                      }
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              <div className={styles['fw-dropdown-error']}>
                {meta.error && meta.touched? `* ${meta.error}` : ''}
              </div>
            </FormGroup>  
          );
        }}
      </Field>
    </div>
  );
};

const FwDropdownSearch: FC<IFwDropdownSearchProps> = (props) => {
  const {
    value = '',
    setValue,
    placeholder
  } = {...props};
  const [buttonAction, setButtonAction] = useState('Search');
  const dropdownSearchRef = useRef<HTMLInputElement>(null);

  useEffect(()=>{
    setButtonAction(value.length > 0 ? 'Clear': 'Search');
  },[value]);

  useEffect(()=>{
    dropdownSearchRef?.current?.focus();
  });

  const handleButtonClick = (e: MouseEvent<HTMLButtonElement>) => {
    value.length > 0 && setValue('');
  };

  return(
    <div className={styles['fw-dropdown-search']}>
      <FormControl
        autoFocus
        className={styles['fw-dropdown-search-area']}
        onChange={(e: BaseSyntheticEvent) => setValue((e.target.value as string))}
        placeholder={placeholder}
        ref={dropdownSearchRef}
        value={value}
      />
      <div className={styles['fw-dropdown-search-button']}>
        <FwButton
          animation={AnimationType.PROGRESS}
          onClick={(e: MouseEvent<HTMLButtonElement>) => handleButtonClick(e)}
          variant={TemplateVariant.SECONDARY}
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
    </div>
  );
};

export default FwDropdown;