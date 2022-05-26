import {
  FC,
  useState,
  // useEffect,
  useRef
} from 'react'; 
import styles from './RecipeBook.module.scss';
import { 
  Formik, 
  FormikProps
} from 'formik'; 
import FwButton from '../../shared/templates/Button';
import FwCheckBoxList, { 
  IFwCheckBox 
} from '../../shared/templates/CheckboxList';
import FwInput from '../../shared/templates/Input';
import IRecipe from '../../domain/IRecipe';
import { 
  RecipeScope, 
  RecipeTags 
} from '../../domain/constants';
import FwModal from '../../shared/templates/Modal';
import AddRecipe from '../AddRecipe';

export interface IRecipeBookProps {
  recipeList?: IRecipe[]
}

// interface IRecipeList {
//   [key: string]: IRecipe 
// }

const RecipeBook: FC<IRecipeBookProps> = (props) =>{

  // const [ addRecipeSubmit, setAddRecipeSubmit ] = useState();
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
  const addRecipeRef = useRef<FormikProps<any>>(null);

  // useEffect(()=>{
  //   console.log(addRecipeSubmit);
  // },[addRecipeSubmit]);

  return (
    <Formik
      initialValues={{
        recipeScopeFilter: [],
        recipeTagsFilter: [],
        recipeNameFilter: '',
      }}
      onSubmit={() => {
        return; 
      }}
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
                    onClick={() => {
                      formik.resetForm();
                    }} 
                    variant='primary'
                  >
                    <span>Clear Filters</span>
                  </FwButton>
                </div>
                <div className={styles['scope']}>  
                  <span className={styles.title}>
                    Scope:
                  </span>
                  <FwCheckBoxList
                    name='recipeScopeFilter'
                    options={recipeScopeOptions}
                  />
                </div>
                <div className={styles['tags']}>  
                  <span className={styles.title}>
                    Tags:
                  </span>
                  <FwCheckBoxList
                    columnsNr={3}
                    name='recipeTagsFilter'
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
                    handleBtnPrimary={() => addRecipeRef?.current?.handleSubmit()}
                    handleClose={() => setOpenAddRecipe(false)}
                    isOpen={openAddRecipe}
                    modalBtnPrimaryText='Add' 
                    modalTitleText='Add Recipe'
                  >
                    <AddRecipe 
                      // @ts-ignore
                      ref={addRecipeRef}
                    />
                  </FwModal>
                </div>
              </div>
              <div className={styles.preview}>

              </div>
            </div>
            <div className={styles['recipe-book-right']}>
              <div className={styles.search}>
                <FwInput
                  formikValidFrame={false}
                  name='recipeNameFilter'
                  placeholder='Type to filter...'
                  type='search'
                />
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