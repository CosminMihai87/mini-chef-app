
import {
  FC, 
  // useEffect
} from 'react';
import styles from './AddRecipe.module.scss';
import { Formik, Form, FieldArray } from 'formik';
import * as Yup from 'yup';
import { RecipeScope, RecipeTags, TimeUnits } from '../../domain/constants';
// import { IFwDropdownOption } from '../../shared/templates/Dropdown';
import FwButton from '../../shared/templates/Button';
import { IFwCheckBox } from '../../shared/templates/CheckboxList';
import FormikControl from '../../shared/templates/Formik/FormikControl';

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
      number: 0,
      timeUnit: ''
    }
  }],
  popularity: 5
};

const validationSchema = Yup.object({
  name: Yup.string().required('Field required!'),
  scope: Yup.array().of(
    Yup.string().required('Field required!')
  ),
  tags: Yup.array().of(
    Yup.string().required('Field required!')
  ),
  //ingredient list validation goes here
  duration: Yup.object().shape({
    number: Yup.number()
      .positive()
      .integer()
      .min(1)
      .required('Field required!'),
    timeUnit: Yup.string().required('Field required!')
  }),
  steps: Yup.array().of(
    Yup.object().shape({
      do: Yup.string().required('Field required!'),
      duration: Yup.object().shape({
        number: Yup.number()
          .positive()
          .integer()
          .min(1)
          .required('Field required!'),
        timeUnit: Yup.string().required('Field required!')
      })
    })
  ),
  popularity: Yup.number()
    .positive()
    .integer()
    .min(1)
    .max(5)
    .required('Field required!')
});

const onSubmit = (values: any, submitProps: any) => {
  console.log('Form data', values);
  console.log('submitProps', submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

interface IAddRecipeProps {
  handleSubmit?: any,
  setHandleSubmit?: any
}

const AddRecipe: FC<IAddRecipeProps> = (props) => {

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

  // useEffect(()=>{
  //   console.log(RecipeScope);
  //   console.log(Object.keys(RecipeScope));
  //   console.log(recipeScopeOptions);
  // },[])

  // const {
  //   // handleSubmit, 
  //   setHandleSubmit
  // } = props;

  // useEffect(()=>{
  //   setHandleSubmit(onSubmit)
  // },[onSubmit])

  return (
    <div className={styles['add-recipe']}> 
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {formik => {
          // console.log(formik.values);
          return (
            <Form>
              <FormikControl
                control='input'
                inputType='text'
                label='Name:'
                name='name'
              />
              {/* <FormikControl
                control='dropdown'
                label='Scope:'
                name='scope'
                options= {(Object.keys(RecipeScope) as (keyof typeof RecipeScope)[]).map(
                  (key, index) => {
                    return {
                      key: key, 
                      value: Object.values(RecipeScope)[index]
                    };
                  },
                )}
              /> */}
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
                            <div className={styles.order}>
                              <span>{index+1}.</span>
                            </div>
                            <div className={styles.do}>
                              <FormikControl
                                control='textarea'
                                name={`steps[${index}].do`}
                              />
                            </div>
                            <div className={styles.duration}>
                              <FormikControl
                                control='input'
                                inputType='number'
                                label=''
                                name={`steps[${index}].duration.number`}
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
                                name={`steps[${index}].duration.timeUnit`}
                              />
                            </div>
                            <div className={styles.buttons}>
                              <FwButton
                                animation='progress'
                                onClick={() => push(index)}
                                variant='secondary'
                              >
                                <span> + </span>
                              </FwButton>
                              {index > 0 && 
                                <FwButton
                                  animation='progress'
                                  onClick={() => remove(index)}
                                  variant='secondary'
                                >
                                  <span> - </span>
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

              {/* <button
                type='submit'
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </button> */}

            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default AddRecipe;