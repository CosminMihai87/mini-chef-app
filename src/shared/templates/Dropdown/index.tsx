import {
  FC,
  useState, 
  useCallback,
  MouseEvent
} from 'react';
import styles from './FwDropdown.module.scss';
import { Dropdown } from 'react-bootstrap';
import chevronUpSVG from '../../../assets/images/chevron-up.svg';
import chevronDownSVG from '../../../assets/images/chevron-down.svg';
import checkSVG from '../../../assets/images/check.svg';

// type animationType = 'progress' | 'jello' | 'pulse' | undefined;

interface IFWDropdownProps {
  isDisabled?: boolean,
  id?: string,
  options: IDropdownOption[],
  selectedOption?: string,
  setSelectedOption?: any
  // animation?: animationType
};

export interface IDropdownOption {
  id: string,
  text: string
}

const FWDropdown: FC<IFWDropdownProps> = (props) => {
  const {
    isDisabled = false,
    id = undefined,
    options,
    selectedOption = props.options[0].text,
    setSelectedOption,
    // animation = 'progress'
  } = {...props};
  const [expandedDropdown, setExpandedDropdown] = useState(false);

  const handleOptionClick = useCallback((e: MouseEvent<HTMLInputElement>) => {
    const foundItem:IDropdownOption | undefined = options.find((opt: IDropdownOption) => opt.text === (e.target as HTMLInputElement).value);
    setSelectedOption(foundItem!==undefined ? foundItem.id : '');
  },[]);

  const handleToggleClick = useCallback(() => {
    !isDisabled && setExpandedDropdown(!expandedDropdown);
  },[]);

  const findValueInOptions = (options:IDropdownOption[], value:string) => {
    const found:IDropdownOption | undefined = options.find((opt: IDropdownOption) => opt.id === value);
    return found!==undefined ? found.text : false
  }

   return (
    <Dropdown
      className={styles['fw-dropdown']}
      onClick={() => handleToggleClick()}
    >
      <Dropdown.Toggle
        className={`
          ${styles['fw-dropdown-toggle']}
          ${isDisabled}
        `}
        disabled={isDisabled}
        id={id}
      > 
        <>
          {selectedOption && options && findValueInOptions(options, selectedOption)}
          <img 
            alt='Chevron Icon placeholder'
            src={expandedDropdown ? chevronUpSVG : chevronDownSVG}
          />
        </>
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`
          ${styles['fw-dropdown-menu']}
        `}
      >
        {options && options.map((item: IDropdownOption) => (
          <Dropdown.Item
            className={`
              ${styles['fw-dropdown-item']}
              ${selectedOption && selectedOption === item.id && styles['fw-dropdown-item-selected']}
            `}
            tabIndex={expandedDropdown ? 0 : -1}
            key={options.indexOf(item)}
            onClick={(e) => handleOptionClick(e as MouseEvent<HTMLInputElement>)}
          >
            {item.text}
            {selectedOption && selectedOption === item.id &&
              <img 
                alt='Check Icon placeholder'
                src={checkSVG}
              />
            }
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  )
};

export default FWDropdown;