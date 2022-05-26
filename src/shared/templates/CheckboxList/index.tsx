import {
  FC
} from 'react';
import styles from './FwCheckBoxList.module.scss';
import { 
  Field
} from 'formik';
import {
  FormGroup,
  FormLabel 
} from 'react-bootstrap';

export type checkBoxDirection = 'column' | 'row';

export interface IFwCheckBoxListProps {
  label?: string,
  name: string,
  options: IFwCheckBox[] | undefined,
  direction?: checkBoxDirection,
  columnsNr?: number
}

export interface IFwCheckBox {
  key: string,
  value: string,
  checked?: boolean,
  isDisabled?: boolean
}

const FwCheckBoxList: FC<IFwCheckBoxListProps> = (props) => {
  const {
    label = '',
    name,
    options,
    direction = 'column',
    columnsNr = 1
  } = {...props};
  const columnsStyle: any = {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    columns: columnsNr
  };

  return (
    <div className={styles['fw-form-control']}>
      <Field name={name}>
        {({ field, meta }: any) => {
          // console.log(meta);
          return (
            <FormGroup className={`
              ${styles['fw-checkbox-list']}
              ${direction}
            `}
            >
              {label && 
                <FormLabel 
                  className={styles['fw-checkbox-list-label']}
                  htmlFor={name}
                >
                  {label}
                </FormLabel>
              } 
              <ul style={columnsStyle}>
                {options?.map((option: IFwCheckBox, index: number) => (
                  <li key={option.key}>
                    <div 
                      className={styles['fw-checkbox']}
                    >
                      <input
                        checked={field.value.includes(option.value)}
                        className={`
                          ${styles['fw-checkbox-box']}
                          ${field.value.includes(option.value) && styles['checked']}
                        `}
                        disabled={option.isDisabled}
                        id={option.key}
                        name={name}
                        onBlur={field.onBlur}
                        onChange={field.onChange}
                        type='checkbox'
                        value={option.value}
                      />
                      <label
                        className={styles['fw-checkbox-label']}
                        htmlFor={option.key}
                      >
                        {option.value}
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
              <div className={styles['fw-checkbox-list-error']}>
                {meta.error && meta.touched? `* ${meta.error}` : ''}
              </div>
            </FormGroup>
          );
        }}
      </Field>
    </div>
  );
};

export default FwCheckBoxList;