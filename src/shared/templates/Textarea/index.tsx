import {
  FC,
  useRef,
  RefObject
} from 'react';
import styles from './FwTextarea.module.scss';
import { 
  Field,
  FieldProps
} from 'formik';
import {
  FormGroup,
  FormLabel,
  FormControl
} from 'react-bootstrap';

export interface IFwTextareaProps {
  label?: string,
  name: string,
  id?: string,
  placeholder?: string | undefined
  innerRef?: RefObject<HTMLTextAreaElement> | null,
  formikValidFrame?:boolean
}

const FwTextarea: FC<IFwTextareaProps> = (props) => {
  const {
    name,
    id = undefined,
    label = '',
    innerRef = null,
    placeholder,
    formikValidFrame = true
  } = {...props};
  const inputRef = useRef<HTMLTextAreaElement>(innerRef as HTMLTextAreaElement | null);

  return(
    <div className={styles['fw-form-control']}>
      <Field name={name}>
        {(props: FieldProps) => {
          const { 
            field, 
            meta 
          } = props;
          return ( 
            <FormGroup className={styles['fw-textarea-group']}>
              {label && 
                <FormLabel 
                  className={styles['fw-textarea-label']}
                  htmlFor={name}
                >
                  {label}
                </FormLabel>
              }
              <FormControl
                as='textarea'
                autoComplete ='off'
                className={`
                  ${styles['fw-textarea-box']}
                  ${formikValidFrame && meta.touched && (meta.error ? `${styles.error}` : `${styles.valid}`)}
                `}
                id={id}
                name={name}
                onBlur={field.onBlur}
                onChange={field.onChange}
                placeholder={placeholder}
                ref={inputRef}
                rows={2}
                value={field.value}
                wrap='off'
              /> 
              <div className={styles['fw-textarea-error']}>
                {meta.error && meta.touched ? `* ${meta.error}` : ''}
              </div>
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};

export default FwTextarea;