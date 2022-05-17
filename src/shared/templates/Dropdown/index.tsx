import {
  FC,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction
} from 'react';
import styles from './FwDropdown.module.scss';
import { Dropdown } from 'react-bootstrap';
import ChevronUpSVG from '../../../assets/images/chevron-up.svg';
import ChevronDownSVG from '../../../assets/images/chevron-down.svg';
import CheckSVG from '../../../assets/images/check.svg';

type animationType = 'progress' | 'jello' | 'pulse' | undefined;

interface IFWDropdownProps {
  isDisabled?: boolean,
  id?: string,
  options: IFWDropdownOption[],
  selectedOption: string | undefined,
  setSelectedOption: Dispatch<SetStateAction<string | undefined>>
  animation?: animationType
  variant?: string,
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
  } = {...props};
  const [expandedDropdown, setExpandedDropdown] = useState(false);

  const handleOptionClick = (e: MouseEvent<HTMLElement>) => {
    setSelectedOption(options?.find((opt: IFWDropdownOption) => opt.text=== (e.target as HTMLElement).innerText)?.id);
  };

  const handleToggleClick = () => {
    !isDisabled && setExpandedDropdown(!expandedDropdown);
  };

  return (
    <Dropdown
      className={styles['fw-dropdown']}
      onClick={() => handleToggleClick()}
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
        {options?.find((t:IFWDropdownOption)=> t.id===selectedOption)?.text}
        {expandedDropdown ? <ChevronUpSVG /> :  <ChevronDownSVG />}
      </Dropdown.Toggle>
      <Dropdown.Menu
        className={`
          ${styles['fw-dropdown-menu']}
          ${!expandedDropdown ? `${styles.hide}` : ''}
        `}
      >
        {options && options.map((item: IFWDropdownOption) => (
          <Dropdown.Item
            className={`
              ${styles['fw-dropdown-item']}
              ${styles[`${variant}`]}
              ${styles[`animation-${animation}`]}
              ${selectedOption && selectedOption === item.id && styles['fw-dropdown-item-selected']}
            `}
            key={options.indexOf(item)}
            onClick={(e) => handleOptionClick(e as MouseEvent<HTMLInputElement>)}
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

export default FWDropdown;