import {
  FC,
  RefObject
} from 'react';
import FwInput from '../Input';
import FwTextarea from '../Textarea';
import FwDropdown, { IFwDropdownOption }  from '../Dropdown';
import { 
  controlType,
  ControlType,
  dropdownType,
  templateVariant,
  animationType,
  checkBoxDirection,
  inputType
} from '../../constants';
import FwCheckBoxList, { IFwCheckBox } from '../CheckboxList';

export interface IFormikControlProps {
  control: controlType,
  inputType?: inputType,
  dropdownType?: dropdownType,
  label?: string,
  name: string,
  id?: string,
  placeholder?: string
  innerRef?: RefObject<HTMLElement> | null,
  dropdownOptions?: IFwDropdownOption[],
  defaultValue?: string,
  checkBoxListOptions?: IFwCheckBox[],
  dropdownVariant?: templateVariant,
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
    defaultValue,
    checkBoxListOptions,
    dropdownVariant,
    animation,
    direction,
    columnsNr
  } = {...props};

  switch (control) {
  case ControlType.INPUT:
    return <FwInput 
      id={id}
      innerRef={innerRef as RefObject<HTMLInputElement>}
      label={label}
      name={name}
      placeholder={placeholder}
      type={inputType}
    />;
  case ControlType.TEXTAREA:
    return <FwTextarea 
      id={id}
      innerRef={innerRef as RefObject<HTMLTextAreaElement>}
      label={label}
      name={name}
      placeholder={placeholder}
    />;
  case ControlType.DROPDOWN:
    return <FwDropdown
      animation={animation}
      defaultValue={defaultValue}
      dropdownType={dropdownType}
      id={id}
      label={label}
      name={name}
      options={dropdownOptions}
      variant={dropdownVariant}
    />;
  case ControlType.CHECKBOXLIST:
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