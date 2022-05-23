import {
  FC,
  useState,
  useEffect
} from 'react';
import styles from './RecipeBook.module.scss';
import FwCheckBoxList, { IFWCheckBox } from '../../shared/templates/CheckboxList';
import FwTextarea from '../../shared/templates/Textarea';
import FwButton from '../../shared/templates/Button';
import IRecipe from '../../domain/IRecipe'; //, { recipeScope } 
import { RecipeScope, RecipeTags } from '../../domain/constants';
import FwModal from '../../shared/templates/Modal';

export interface IRecipeBookProps {
  recipeList?: IRecipe[]
}

// interface IRecipeList {
//   [key: string]: IRecipe 
// }

const RecipeBook: FC<IRecipeBookProps> = (props) =>{

  const [ openAddRecipe, setOpenAddRecipe ] = useState(false);
  const [ searchValue, setSearchValue ] = useState('');
  const [ recipeType, setRecipeType ] = useState<IFWCheckBox[]>(
    (Object.keys(RecipeScope) as (keyof typeof RecipeScope)[]).map(
      (key, index) => {
        return {
          id: key, 
          text: Object.values(RecipeScope)[index],
          checked: false, 
          isDisabled: false
        };
      },
    )
  );
  const [ recipeTags, setRecipeTags ] = useState<IFWCheckBox[]>(
    (Object.keys(RecipeTags) as (keyof typeof RecipeTags)[]).map(
      (key, index) => {
        return {
          id: key, 
          text: Object.values(RecipeTags)[index],
          checked: false, 
          isDisabled: false
        };
      },
    )
  );

  useEffect(()=>{
    console.log(openAddRecipe);
  },[openAddRecipe]);

  const handleClearFilters = () => {
    setRecipeType(recipeType.map( (k: any)=>{
      return {...k, ...{ checked: false}}; 
    } ));
    setRecipeTags(recipeTags.map( (k: any)=>{
      return {...k, ...{ checked: false}}; 
    } ));
    setSearchValue('');
  };

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
              options={recipeType}
              setOptions={setRecipeType}
            />
          </div>
          <div className={styles['tags']}>  
            <span className={styles.title}>
              Tags:
            </span>
            <FwCheckBoxList
              columnsNr={3}
              options={recipeTags}
              setOptions={setRecipeTags}
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
              handleClose={() => setOpenAddRecipe(false)} 
              isOpen={openAddRecipe}
              modalTitleText='Add Recipe'
              modalBtnPrimaryText='Add'
            >
              This is Modal Content!
            </FwModal>
          </div>
        </div>
        <div className={styles.preview}>

        </div>
      </div>
      <div className={styles['recipe-book-right']}>
        <div className={styles.search}>
          <FwTextarea
            setValue={setSearchValue}
            value={searchValue}
            variant='search'
          />
        </div>
        <div className={styles.list}>

        </div>
      </div>
    </div>
  );
};

export default RecipeBook;