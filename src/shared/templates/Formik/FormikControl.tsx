import {
  FC
} from 'react';
import FwInput, { 
  inputType 
} from '../Input';
import FwTextarea from '../Textarea';
import FwDropdown, { 
  IFwDropdownOption, 
  dropdownType, 
  dropdownVariant, 
  animationType 
}  from '../Dropdown';
import FwCheckBoxList, {
  IFwCheckBox,
  checkBoxDirection
} from '../CheckboxList';

export interface IFormikControlProps {
  control: string,
  inputType?: inputType,
  dropdownType?: dropdownType,
  label?: string,
  name: string,
  id?: string,
  placeholder?: string
  innerRef?: any,
  dropdownOptions?: IFwDropdownOption[],
  checkBoxListOptions?: IFwCheckBox[],
  dropdownVariant?: dropdownVariant,
  animation?: animationType
  direction?: checkBoxDirection,
  columnsNr?: number
}

const FormikControl: FC<IFormikControlProps> = (props) => {
  const { 
    control,
    inputType,
    dropdownType,
    label,
    name,
    id,
    placeholder,
    innerRef,
    dropdownOptions,
    checkBoxListOptions,
    dropdownVariant,
    animation,
    direction,
    columnsNr
  } = {...props};

  switch (control) {
  case 'input':
    return <FwInput 
      id={id}
      innerRef={innerRef}
      label={label}
      name={name}
      placeholder={placeholder}
      type={inputType}
    />;
  case 'textarea':
    return <FwTextarea 
      id={id}
      innerRef={innerRef}
      label={label}
      name={name}
      placeholder={placeholder}
    />;
  case 'dropdown':
    return <FwDropdown
      animation={animation}
      dropdownType={dropdownType}
      id={id}
      label={label}
      name={name}
      options={dropdownOptions}
      variant={dropdownVariant}
    />;
  case 'checkboxList':
    return <FwCheckBoxList 
      columnsNr={columnsNr}
      direction={direction}
      label={label}
      name={name}
      options={checkBoxListOptions}
    />;
    // case 'radio':
    //   return <RadioButtons {...rest} />
    // case 'date':
    //   return <DatePicker {...rest} />
  default:
    return null;
  }
};

export default FormikControl;