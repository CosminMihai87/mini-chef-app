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
    ingredients,
    steps
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
                    number,
                    measuringUnit
                  },
                  replacement
                } = item;
                return <li key={`${key}-ingredients-${index}`}>
                  <span>
                    {number} {measuringUnit} of {name}
                    {replacement? `(replace with ${replacement})` : ''}
                  </span>
                </li>;
              })}
            </ul>
          </div>
          <div className={styles.steps}>
            <div className={styles['steps-title']}>
              <span>Steps:</span>
            </div>
            <ul>
              {steps.map((item, index) => {
                const { 
                  description,
                  duration: {
                    number,
                    timeUnit
                  }
                } = item;
                return <li key={`${key}-steps-${index}`}>
                  <span>
                    {description} ({number} {timeUnit})
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