import {
  FC,
  useState,
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
import { 
  AnimationType, 
  InputType, 
  TemplateVariant 
} from '../../shared/constants';
import IRecipe from '../../domain/IRecipe';
import { 
  RecipeScope, 
  RecipeTags 
} from '../../domain/constants';
import FwModal from '../../shared/templates/Modal';
import AddRecipe, { IAddRecipeForm } from '../AddRecipe';

export interface IRecipeBookProps {
  recipeList?: IRecipe[]
}

// interface IRecipeList {
//   [key: string]: IRecipe 
// }

const RecipeBook: FC<IRecipeBookProps> = (props) =>{

  const [ openAddRecipe, setOpenAddRecipe ] = useState(false);
  const [ openEditRecipe, setOpenEditRecipe ] = useState(false);
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
  const addRecipeRef = useRef<FormikProps<IAddRecipeForm>>(null);
  const editRecipeRef = useRef<FormikProps<IAddRecipeForm>>(null);

  const handleRecipeRemove = () => {
    return true;
  };

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
                <div className={styles.scope}>  
                  <span className={styles.title}>
                    Scope:
                  </span>
                  <FwCheckBoxList
                    name='recipeScopeFilter'
                    options={recipeScopeOptions}
                  />
                </div>
                <div className={styles.tags}>  
                  <span className={styles.title}>
                    Tags:
                  </span>
                  <FwCheckBoxList
                    columnsNr={2}
                    name='recipeTagsFilter'
                    options={recipeTagsOptions}
                  />
                </div>
                <div className={styles['manage-recipes']}>  
                  <span className={styles.title}>
                    Manage Recipes:
                  </span>
                  <div className={styles.buttons}> 
                    <div className={styles.add}>  
                      <FwButton
                        animation={AnimationType.PROGRESS}
                        onClick={() => setOpenAddRecipe(!openAddRecipe)} 
                        variant={TemplateVariant.PRIMARY}
                      >
                        <span>Add</span>
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
                    <div className={styles.remove}>  
                      <FwButton
                        animation={AnimationType.PROGRESS}
                        onClick={() => handleRecipeRemove()} 
                        variant={TemplateVariant.PRIMARY}
                      >
                        <span>Remove</span>
                      </FwButton>
                    </div>
                    <div className={styles.edit}>  
                      <FwButton
                        animation={AnimationType.PROGRESS}
                        onClick={() => setOpenEditRecipe(!openEditRecipe)} 
                        variant={TemplateVariant.PRIMARY}
                      >
                        <span>Edit</span>
                      </FwButton>
                      <FwModal 
                        closeOnPrimaryButtonClick={false} 
                        handleBtnPrimary={() => editRecipeRef?.current?.handleSubmit()}
                        handleClose={() => setOpenAddRecipe(false)}
                        isOpen={openAddRecipe}
                        modalBtnPrimaryText='Save' 
                        modalTitleText='Edit Recipe'
                      >
                        <AddRecipe 
                          // @ts-ignore
                          ref={editRecipeRef}
                        />
                      </FwModal>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.search}>
                <FwInput
                  formikValidFrame={false}
                  name='recipeNameFilter'
                  placeholder='Type to filter...'
                  type={InputType.SEARCH}
                />
                <FwButton
                  animation={AnimationType.PROGRESS}
                  onClick={() => {
                    formik.resetForm();
                  }} 
                  variant={TemplateVariant.PRIMARY}
                >
                  <span>Clear Filters</span>
                </FwButton>
              </div>
              <div className={styles.list}>

              </div>
            </div>
            <div className={styles['recipe-book-right']}>
              <div className={styles.preview}>

              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default RecipeBook;