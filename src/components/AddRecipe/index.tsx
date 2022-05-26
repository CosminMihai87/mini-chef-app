
import {
  FC,
  forwardRef
} from 'react';
import styles from './AddRecipe.module.scss';
import { 
  Formik, 
  FormikProps,
  Form, 
  FieldArray
} from 'formik';
import * as Yup from 'yup';
import { 
  RecipeScope, 
  RecipeTags, 
  TimeUnits 
} from '../../domain/constants';
import FwButton from '../../shared/templates/Button';
import { IFwCheckBox } from '../../shared/templates/CheckboxList';
import FormikControl from '../../shared/templates/Formik/FormikControl';
import PlusLogo from '../../assets/images/form-validation/plus.svg';
import MinusLogo from '../../assets/images/form-validation/minus.svg';

const initialValues = {
  name: '',
  scope: [],
  tags: [],
  ingredientList: [],
  duration: {
    number: 0,
    timeUnit: ''
  },
  steps: [{
    do: '',
    duration: {
      number: '',
      timeUnit: ''
    }
  }],
  popularity: 5
};

const validationSchema = Yup.object({
  name: Yup.string()
    .max(255,'Must be less or equal than 255 chars!')
    .required('Field required!'),
  scope: Yup.array().min(1, 'Atleast 1 required!'),
  tags: Yup.array().min(1, 'Atleast 1 required!'),
  //ingredient list validation goes here
  duration: Yup.object().shape({
    number: Yup.number()
      .positive()
      .integer()
      .min(1,'Must be greater or equal than 1!')
      .required('Field required!'),
    timeUnit: Yup.string().required('Field required!')
  }),
  steps: Yup.array().of(
    Yup.object().shape({
      do: Yup.string()
        .max(255,'Must be less or equal than 255 chars!')
        .required('Field required!'),
      duration: Yup.object().shape({
        number: Yup.number()
          .positive()
          .integer()
          .min(1,'Must be greater or equal than 1!')
          .required('Field required!'),
        timeUnit: Yup.string().required('Field required!')
      })
    })
  ).min(1, 'Need at least 1 step!'),
  popularity: Yup.number()
    .positive()
    .integer()
    .min(1,'Must be greater or equal than 1!')
    .max(5,'Must be less or equal than 5!')
    .required('Field required!')
});

const onSubmit = (values: any, submitProps: any) => {
  console.log('Form data', values);
  console.log('submitProps', submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

const AddRecipe: FC = forwardRef<FormikProps<any>>((props, ref) => {

  const recipeScopeOptions: IFwCheckBox[]  = (Object.keys(RecipeScope) as (keyof typeof RecipeScope)[]).map(
    (key, index) => {
      return {
        key: key, 
        value: Object.values(RecipeScope)[index],
        checked: false, 
        isDisabled: false
      };
    },
  );
  const recipeTagsOptions: IFwCheckBox[]  = (Object.keys(RecipeTags) as (keyof typeof RecipeTags)[]).map(
    (key, index) => {
      return {
        key: key, 
        value: Object.values(RecipeTags)[index],
        checked: false, 
        isDisabled: false
      };
    },
  );

  return (
    <div className={styles['add-recipe']}> 
      <Formik
        initialValues={initialValues}
        innerRef={ref}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => {
          // console.log(formik);
          return (
            <Form>
              <FormikControl
                control='input'
                inputType='text'
                label='Name:'
                name='name'
              />
              <FormikControl
                checkBoxListOptions={recipeScopeOptions}
                columnsNr={2}
                control='checkboxList'
                label='Scope:'
                name='scope'
              />
              <FormikControl
                checkBoxListOptions={recipeTagsOptions}
                columnsNr={5}
                control='checkboxList'
                label='Tags:'
                name='tags'
              />
              <div className={`
                ${styles.row} 
                ${styles.duration}
              `}>
                <FormikControl
                  control='input'
                  inputType='number'
                  label='Prep time:'
                  name='duration.number'
                />
                <FormikControl
                  control='dropdown'
                  dropdownOptions= {(Object.keys(TimeUnits) as (keyof typeof TimeUnits)[]).map(
                    (key, index) => {
                      return {
                        key: key, 
                        value: Object.values(TimeUnits)[index]
                      };
                    },
                  )}
                  label=''
                  name='duration.timeUnit'
                />
              </div>
              <div className={`
                ${styles.combo}
                ${styles.steps}
              `}>
                <label 
                  className={styles['label']}
                  htmlFor='steps'
                >
                  Steps: 
                </label>
                <FieldArray name='steps'>
                  {
                    (fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { steps } = values;
                      return <>
                        {steps.map((step: string, index: number) => (
                          <div 
                            className={`
                              ${styles.row} 
                              ${styles.step}
                            `}
                            key={index}
                          >
                            <div className={styles.do}>
                              <FormikControl
                                control='textarea'
                                name={`steps[${index}].do`}
                              />
                            </div>
                            <div className={styles.duration}>
                              <div className={styles.number}>
                                <FormikControl
                                  control='input'
                                  inputType='number'
                                  label=''
                                  name={`steps[${index}].duration.number`}
                                />
                              </div>
                              <div className={styles['time-units']}>
                                <FormikControl
                                  control='dropdown'
                                  dropdownOptions= {(Object.keys(TimeUnits) as (keyof typeof TimeUnits)[]).map(
                                    (key, index) => {
                                      return {
                                        key: key,
                                        value: Object.values(TimeUnits)[index]
                                      };
                                    },
                                  )}
                                  label=''
                                  name={`steps[${index}].duration.timeUnit`}
                                />
                              </div>
                            </div>
                            <div className={styles.buttons}>
                              <FwButton
                                animation='progress'
                                onClick={() => push({ do: '', duration: { number: '', timeUnit: '' }})}
                                variant='secondary'
                              >
                                <PlusLogo 
                                  height='30px'
                                  width='30px'
                                />
                              </FwButton>
                              {index > 0 && 
                                <FwButton
                                  animation='progress'
                                  onClick={() => remove(index)}
                                  variant='secondary'
                                >
                                  <MinusLogo 
                                    height='30px'
                                    width='30px'
                                  />
                                </FwButton>
                              }
                            </div>
                          </div>
                        ))}
                      </>;
                    }
                  }
                </FieldArray>
              </div>
              <FormikControl
                control='input'
                inputType='text'
                label='Rate the recipe:'
                name='popularity'
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
});

export default AddRecipe;