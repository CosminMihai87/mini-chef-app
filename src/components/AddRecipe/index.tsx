
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
  TimeUnits,
  IngredientMeasuringUnits
} from '../../domain/constants';
import FwButton from '../../shared/templates/Button';
import { IFwCheckBox } from '../../shared/templates/CheckboxList';
import { IFwDropdownOption } from '../../shared/templates/Dropdown';
import { 
  ControlType,
  InputType
} from '../../shared/constants';
import FormikControl from '../../shared/templates/Formik/FormikControl';
import PlusLogo from '../../assets/images/form-validation/plus.svg';
import MinusLogo from '../../assets/images/form-validation/minus.svg';

const initialValues = {
  name: '',
  scope: [],
  tags: [],
  ingredients: [{
    ingredient: '',
    quantity: {
      number: '',
      measuringUnit: ''
    },
    replacement: ''
  }],
  duration: {
    number: '',
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
  duration: Yup.object().shape({
    number: Yup.number()
      .typeError('Must be a Number!')
      .integer('Must be Integer!')
      .min(1,'Must be greater or equal than 1!')
      .required('Field required!'),
    timeUnit: Yup.string().required('Field required!')
  }),
  ingredients: Yup.array().of(
    Yup.object().shape({
      ingredient: Yup.string().required('Field required!'),
      quantity: Yup.object().shape({
        number: Yup.number()
          .typeError('Must be a Number!')
          .integer('Must be Integer!')
          .min(1,'Must be greater or equal than 1!')
          .required('Field required!'),
        measuringUnit: Yup.string().required('Field required!')
      }),
      // replacement: Yup.string().required('Field required!')  //optional field!
    })
  ).min(1, 'Need at least 1 ingredient!'),
  steps: Yup.array().of(
    Yup.object().shape({
      do: Yup.string()
        .max(255,'Must be less or equal than 255 chars!')
        .required('Field required!'),
      duration: Yup.object().shape({
        number: Yup.number()
          .typeError('Must be a Number!')
          .integer('Must be Integer!')
          .min(1,'Must be greater or equal than 1!')
          .required('Field required!'),
        timeUnit: Yup.string().required('Field required!')
      })
    })
  ).min(1, 'Need at least 1 step!'),
  popularity: Yup.number()
    .typeError('Must be a Number!')
    .integer('Must be Integer!')
    .min(1,'Must be greater or equal than 1!')
    .max(5,'Must be less or equal than 5!')
    .required('Field required!')
});

const onSubmit = (values: any, submitProps: any) => {
  console.log('Form data', values);
  // console.log('submitProps', submitProps);
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
  const recipeTimeUnitsOptions: IFwDropdownOption[] = (Object.keys(TimeUnits) as (keyof typeof TimeUnits)[]).map(
    (key, index) => {
      return {
        key: key,
        value: Object.values(TimeUnits)[index]
      };
    },
  ); 
  const recipeMeasuringUnitOptions: IFwDropdownOption[] = (Object.keys(IngredientMeasuringUnits) as (keyof typeof IngredientMeasuringUnits)[]).map(
    (key, index) => {
      return {
        key: key,
        value: Object.values(IngredientMeasuringUnits)[index]
      };
    },
  ); 
  const ingredientsOptions: IFwDropdownOption[] = [
    {
      key: '1',
      value: 'Potatoes'
    },
    {
      key: '2',
      value: 'Chicken Breast'
    },
    {
      key: '3',
      value: 'Flour'
    }
  ];

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
                control={ControlType.INPUT}
                inputType={InputType.TEXT}
                label='Name:'
                name='name'
              />
              <FormikControl
                checkBoxListOptions={recipeScopeOptions}
                columnsNr={2}
                control={ControlType.CHECKBOXLIST}
                label='Scope:'
                name='scope'
              />
              <FormikControl
                checkBoxListOptions={recipeTagsOptions}
                columnsNr={5}
                control={ControlType.CHECKBOXLIST}
                label='Tags:'
                name='tags'
              />
              <div className={styles.row}>
                <label className={styles.label}>
                  Prep time: 
                </label>
                <div className={`
                  ${styles.fields}
                  ${styles.duration}
                `}>
                  <div className={styles.number}>
                    <FormikControl
                      control={ControlType.INPUT}
                      inputType={InputType.NUMBER}
                      label=''
                      name='duration.number'
                    />
                  </div>
                  <div className={styles['time-unit']}>
                    <FormikControl
                      control={ControlType.DROPDOWN}
                      dropdownOptions= {recipeTimeUnitsOptions}
                      label=''
                      name='duration.timeUnit'
                    />
                  </div>
                </div>
              </div>
              <div className={styles.row}>
                <label 
                  className={styles.label}
                  htmlFor='ingredients'
                >
                  Ingredients: 
                </label>
                <FieldArray name='ingredients'>
                  {
                    (fieldArrayProps) => {
                      const { push, remove, form } = fieldArrayProps;
                      const { values } = form;
                      const { ingredients } = values;
                      return <>
                        {ingredients.map((ingredient: string, index: number) => (
                          <div 
                            className={`
                              ${styles.fields}
                              ${styles.ingredients}
                            `}
                            key={index}
                          >
                            <div className={styles.ingredient}>
                              <FormikControl
                                control={ControlType.DROPDOWN}
                                dropdownOptions= {ingredientsOptions}
                                label='Name:'
                                name={`ingredients[${index}].ingredient`}
                              />
                            </div>
                            <div className={styles.quantity}>
                              <div className={styles.number}>
                                <FormikControl
                                  control={ControlType.INPUT}
                                  inputType={InputType.NUMBER}
                                  label='Quantity:'
                                  name={`ingredients[${index}].quantity.number`}
                                />
                              </div>
                              <div className={styles['measuring-unit']}>
                                <FormikControl
                                  control={ControlType.DROPDOWN}
                                  dropdownOptions= {recipeMeasuringUnitOptions}
                                  label='&nbsp;'
                                  name={`ingredients[${index}].quantity.measuringUnit`}
                                />
                              </div>
                            </div>
                            <div className={styles.replacement}>
                              <FormikControl
                                control={ControlType.DROPDOWN}
                                dropdownOptions= {ingredientsOptions}
                                label='Can be replaced by:'
                                name={`ingredients[${index}].replacement`}
                              />
                            </div>
                            <div className={styles.buttons}>
                              <FwButton
                                animation='progress'
                                onClick={() => push({ ingredient: '', quantity: { number: null, measuringUnit: '' }, replacement: ''})}
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
              <div className={styles.row}>
                <label 
                  className={styles.label}
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
                              ${styles.fields}
                              ${styles.steps}
                            `}
                            key={index}
                          >
                            <div className={styles.do}>
                              <FormikControl
                                control={ControlType.TEXTAREA}
                                label='Description:'
                                name={`steps[${index}].do`}
                              />
                            </div>
                            <div className={styles.duration}>
                              <div className={styles.number}>
                                <FormikControl
                                  control={ControlType.INPUT}
                                  inputType={InputType.NUMBER}
                                  label='How Long:'
                                  name={`steps[${index}].duration.number`}
                                />
                              </div>
                              <div className={styles['time-units']}>
                                <FormikControl
                                  control={ControlType.DROPDOWN}
                                  dropdownOptions= {recipeTimeUnitsOptions}
                                  label='&nbsp;'
                                  name={`steps[${index}].duration.timeUnit`}
                                />
                              </div>
                            </div>
                            <div className={styles.buttons}>
                              <FwButton
                                animation='progress'
                                onClick={() => push({ do: '', duration: { number: null, timeUnit: '' }})}
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
                control={ControlType.INPUT}
                inputType={InputType.NUMBER}
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