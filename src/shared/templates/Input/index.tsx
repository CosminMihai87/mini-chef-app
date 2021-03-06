import {
  FC,
  useRef,
  RefObject
} from 'react';
import styles from './FwInput.module.scss';
import { 
  Field,
  FieldProps
} from 'formik';
import {
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap';
import {
  InputType,
  inputType
} from '../../constants';

export interface IFwInputProps {
  type?: inputType;
  label?: string,
  name: string,
  id?: string,
  placeholder?: string | undefined
  innerRef?: RefObject<HTMLInputElement> | null,
  formikValidFrame?:boolean
}

const FwInput: FC<IFwInputProps> = (props) => {
  const {
    type = InputType.TEXT,
    label = '',
    name,
    id = undefined,
    placeholder,
    innerRef = null,
    formikValidFrame = true
  } = {...props};
  const inputRef = useRef<HTMLInputElement>(innerRef as HTMLInputElement | null);

  return(
    <div className={styles['fw-form-control']}>
      <Field name={name}>
        {(props: FieldProps) => {
          const { 
            field, 
            meta 
          } = props;
          return ( 
            <FormGroup className={styles['fw-input-group']}>
              {label && 
                <FormLabel 
                  className={styles['fw-input-label']}
                  htmlFor={name}
                >
                  {label}
                </FormLabel>
              }
              <FormControl
                autoComplete ='off'
                className={`
                  ${styles['fw-input-box']}
                  ${formikValidFrame && meta.touched && (meta.error ? `${styles.error}` : `${styles.valid}`)}
                `}
                id={id}
                name={name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={placeholder}
                ref={inputRef}
                type={type}
                value={field.value}
              /> 
              <div className={styles['fw-input-error']}>
                {meta.error && meta.touched ? `* ${meta.error}` : ''}
              </div>
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};

export default FwInput;