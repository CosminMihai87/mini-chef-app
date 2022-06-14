import {
  FC
} from 'react';
import styles from './RecipePreview.module.scss';
import IRecipe from '../../../domain/IRecipe';
  
export interface IRecipePreviewProps {
  recipe: IRecipe
}

const RecipePreview: FC<IRecipePreviewProps> = (props) => {
  const {
    key,
    // createdOn,
    // editedOn,
    // deletedOn,
    name,
    // scope,
    // tags,
    ingredients
    // duration,
    // steps,
    // popularity
  } = props.recipe;

  return (
    <div className={styles['recipe-preview']}>
      <div className={styles['recipe-pic']}>
      </div>
      <div className={styles['recipe-details']}>
        <div className={styles.title}>
          {name}
        </div>
        <div className={styles.details}>
          <div className={styles.ingredients}>
            <div className={styles['ingredients-title']}>
              <span>Ingredients:</span>
            </div>
            <ul>
              {ingredients.map((item, index) => {
                const { 
                  name,
                  quantity: {
                    measuringUnit,
                    number
                  },
                  replacement
                } = item;
                return <li key={`${key}-${index}`}>
                  <span>
                    {number} {measuringUnit} of {name}
                    {replacement? `(replace with ${replacement})` : ''}
                  </span>
                </li>;
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePreview;