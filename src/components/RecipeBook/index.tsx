import {
  FC,
  useState,
  useRef,
  useEffect
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
import { 
  RecipeScope, 
  RecipeTags 
} from '../../domain/constants';
import FwModal from '../../shared/templates/Modal';
import AddRecipe, { 
  IAddRecipeForm 
} from '../AddRecipe';
import Services from '../../services';
import RecipeRow from './RecipeRow';

const RecipeBook: FC = (props) =>{

  const [ openAddRecipe, setOpenAddRecipe ] = useState(false);
  const [ openUpdateRecipe, setOpenUpdateRecipe ] = useState(false);
  const [ recipeList, setRecipeList ] = useState<any>({});
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
  const updateRecipeRef = useRef<FormikProps<IAddRecipeForm>>(null);
  const {
    createRecipe,
    createRecipeState,
    getRecipes,
    getRecipesState
  } = Services();

  const handleRecipeRemove = () => {
    return true;
  };

  useEffect(()=>{
    getRecipes();
  },[]);

  useEffect(()=>{
    if (getRecipesState.loading === false && 
    Object.keys(getRecipesState.data).length > 0) {
      setRecipeList(getRecipesState.data);
    }
  },[getRecipesState]);

  useEffect(()=>{
    if (createRecipeState.loading === false && 
    Object.keys(createRecipeState.data).length > 0) {
      getRecipes();
      setRecipeList(createRecipeState.data);
    }
  },[createRecipeState]);

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
        let filteredRecipeList = Object.values(recipeList)
          .map((item: any, index: number) => {
            return { 
              key: Object.keys(recipeList)[index],
              name: item.name,
              scope: item.scope,
              tags: item.tags,
              duration: {
                number: item.duration.number,
                timeUnit:  item.duration.timeUnit
              },
              popularity: item.popularity
            };
          })
          .filter((item: any) => item.name.toLowerCase().indexOf(formik.values.recipeNameFilter.toLowerCase())!==-1);

        if (formik.values.recipeScopeFilter.length > 0) {
          filteredRecipeList = filteredRecipeList.filter((item: any) =>
          // @ts-ignore
            item.scope.filter((k: string) => formik.values.recipeScopeFilter.includes(k)).length
          );
        }

        if (formik.values.recipeTagsFilter.length > 0) {
          filteredRecipeList = filteredRecipeList.filter((item: any) => 
          // @ts-ignore
            item.tags.filter((k: string) => formik.values.recipeTagsFilter.includes(k)).length
          );
        }
        
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
                          createRecipe={createRecipe}
                          createRecipeState={createRecipeState}
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
                    <div className={styles.update}>  
                      <FwButton
                        animation={AnimationType.PROGRESS}
                        onClick={() => setOpenUpdateRecipe(!openUpdateRecipe)} 
                        variant={TemplateVariant.PRIMARY}
                      >
                        <span>Update</span>
                      </FwButton>
                      <FwModal 
                        closeOnPrimaryButtonClick={false} 
                        handleBtnPrimary={() => {
                          console.log('Recipe Update!');
                        }}
                        handleClose={() => setOpenUpdateRecipe(false)}
                        isOpen={openUpdateRecipe}
                        modalBtnPrimaryText='Update' 
                        modalTitleText='Update Recipe'
                      >
                        <AddRecipe 
                          // @ts-ignore
                          ref={updateRecipeRef}
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
                <div className={styles['list-header']}>
                  <span className={styles.name}>
                    Name
                  </span>
                  <span className={styles['duration-popularity']}>
                    <span className={styles.duration}>
                      Duration
                    </span>
                    <span className={styles.popularity}>
                      Popularity
                    </span>
                  </span>
                </div>
                <div className={styles['list-content']}>
                  {
                    filteredRecipeList.length > 0 && 
                    filteredRecipeList.map((item: any) => {
                      const { 
                        duration,
                        key,
                        name,
                        popularity
                      } = item;
                      return <RecipeRow 
                        duration={duration}
                        key={key}
                        name={name}
                        popularity={popularity}
                      />;
                    })
                  } 
                </div>
              </div>
            </div>
            <div className={styles['recipe-book-right']}>
              <div className={styles.preview}>
                [TODO: Recipe Preview on select]
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
};

export default RecipeBook;