import {
  FC,
  useState
  // useEffect
} from 'react'; 
import styles from './RecipeBook.module.scss';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FwButton from '../../shared/templates/Button';
import FwCheckBoxList, { 
  IFwCheckBox 
} from '../../shared/templates/CheckboxList';
// import FwInput from '../../shared/templates/Input';
import IRecipe from '../../domain/IRecipe'; //, { recipeScope } 
import { 
  RecipeScope, 
  RecipeTags 
} from '../../domain/constants';
import FwModal from '../../shared/templates/Modal';
import AddRecipe from '../AddRecipe';

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
  name: Yup.string().required('Field required!')
});

const onSubmit = (values: any, submitProps: any) => {
  console.log('Form data', values);
  console.log('submitProps', submitProps);
  submitProps.setSubmitting(false);
  submitProps.resetForm();
};

export interface IRecipeBookProps {
  recipeList?: IRecipe[]
}

// interface IRecipeList {
//   [key: string]: IRecipe 
// }

const RecipeBook: FC<IRecipeBookProps> = (props) =>{

  const [ addRecipeSubmit, setAddRecipeSubmit ] = useState();
  const [ openAddRecipe, setOpenAddRecipe ] = useState(false);
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
  //   console.log(openAddRecipe);
  // },[openAddRecipe]);

  const handleClearFilters = () => {
    // setRecipeType(recipeType.map( (k: any)=>{
    //   return {...k, ...{ checked: false}}; 
    // } ));
    // setRecipeTags(recipeTags.map( (k: any)=>{
    //   return {...k, ...{ checked: false}}; 
    // } ));
    // setSearchValue('');
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {formik => {
        // console.log(formik.values);
        return (
          <div className={styles['recipe-book']}>
            <div className={styles['recipe-book-left']}>
              <div className={styles.title}>
                <span>Recipe Book:</span>
              </div>
              <div className={styles['buttons-and-filters']}>  
                <div className={styles['filter-by']}>  
                  <span className={styles.title}>
                    Filter by:
                  </span>
                  <FwButton
                    animation='progress'
                    onClick={() => handleClearFilters()} 
                    variant='primary'
                  >
                    <span>Clear</span>
                  </FwButton>
                </div>
                <div className={styles['scope']}>  
                  <span className={styles.title}>
                    Scope:
                  </span>
                  <FwCheckBoxList
                    name='recipeType'
                    options={recipeScopeOptions}
                  />
                </div>
                <div className={styles['tags']}>  
                  <span className={styles.title}>
                    Tags:
                  </span>
                  <FwCheckBoxList
                    columnsNr={3}
                    name='recipeTags'
                    options={recipeTagsOptions}
                  />
                </div>
                <div className={styles['manage']}>  
                  <span className={styles.title}>
                    Manage Recipes:
                  </span>
                  <FwButton
                    animation='progress'
                    onClick={() => setOpenAddRecipe(!openAddRecipe)} 
                    variant='primary'
                  >
                    <span>Add Recipe</span>
                  </FwButton>
                  <FwModal 
                    closeOnPrimaryButtonClick={false} 
                    handleBtnPrimary={() => addRecipeSubmit}
                    handleClose={() => setOpenAddRecipe(false)}
                    isOpen={openAddRecipe}
                    modalBtnPrimaryText='Add' 
                    modalTitleText='Add Recipe'
                  >
                    <AddRecipe 
                      handleSubmit={addRecipeSubmit}
                      setHandleSubmit={setAddRecipeSubmit}
                    />
                  </FwModal>
                </div>
              </div>
              <div className={styles.preview}>

              </div>
            </div>
            <div className={styles['recipe-book-right']}>
              <div className={styles.search}>
                {/* <FwInput
                  name='search'
                  placeholder='Type to filter...'
                /> */}
              </div>
              <div className={styles.list}>

              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default RecipeBook;