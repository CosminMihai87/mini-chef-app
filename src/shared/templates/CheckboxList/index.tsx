import {
  FC,
  Dispatch,
  SetStateAction,
  BaseSyntheticEvent
} from 'react';
import styles from './FWCheckBoxList.module.scss';

type checkBoxDirection = 'column' | 'row';

export interface IFwCheckBoxListProps {
  options: IFWCheckBox[],
  setOptions:  Dispatch<SetStateAction<IFWCheckBox[]>>
  direction?: checkBoxDirection,
  columnsNr?: number
}

export interface IFWCheckBox {
  id: string,
  text: string,
  checked?: boolean,
  isDisabled?: boolean
}

const FwCheckBoxList: FC<IFwCheckBoxListProps> = (props) => {
  const {
    options,
    setOptions,
    direction = 'column',
    columnsNr = 1
  } = {...props};
  const nrColumns: any = {
    listStyleType: 'none',
    padding: 0,
    columns: columnsNr
  };

  const handleCheckboxCheck = (id: string) => {
    const elementPoz: number = options.indexOf(options.find((k: IFWCheckBox) => k.id === id) as IFWCheckBox);
    setOptions([
      ...options.slice(0, elementPoz), 
      {...options.find((k: IFWCheckBox) => k.id === id), checked: !options?.find((k: IFWCheckBox) => k.id === id)?.checked }, 
      ...options.slice(elementPoz+1)
    ] as IFWCheckBox[]);
  };

  return (
    <div className={`
      ${styles['fw-checkbox-list']}
      ${direction}
    `}
    >
      <ul style={direction==='column' && nrColumns}>
        {options && options.map((k: IFWCheckBox, index: number) => (
          <li key={k.id}>
            <div 
              className={styles['fw-checkbox']}
            >
              <input
                checked={k.checked}
                className={`
                  ${styles['fw-checkbox-box']}
                  ${k.checked && styles['checked']}
                `}
                disabled={k.isDisabled}
                id={k.id}
                name={k.id}
                onChange={(e: BaseSyntheticEvent) => handleCheckboxCheck(e.target.id as string)}
                type='checkbox'
                value={k.id}
              />
              <label
                className={styles['fw-checkbox-label']}
                htmlFor={k.id}
              >
                {k.text}
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FwCheckBoxList;