import {
  FC
} from 'react';
import styles from './RecipeRow.module.scss';
import StarLogo from '../../../assets/images/star-logo.svg';
import IRecipe from '../../../domain/IRecipe';
  
export type IRecipeRowProps = {
  recipe: IRecipe,
  selected: boolean,
  setSelectedRecipe: any,
};

const RecipeRow: FC<IRecipeRowProps> = (props) => {
  const { recipe } = props;
  const {
    recipe: {
      name,
      duration: {
        number,
        timeUnit
      },
      popularity,
    },
    selected,
    setSelectedRecipe
  } = props;

  return (
    <div 
      className={`
        ${styles['recipe-row']}
        ${selected ? styles.selected : ''}
      `}
      onClick={()=> setSelectedRecipe(recipe)} 
    >
      <div className={styles.name}>
        <span>{name}</span>
      </div>
      <div className={styles['duration-popularity']}>
        <div className={styles.duration}>
          <div className={styles.number}>
            <span>{number}</span>
          </div>
          <div className={styles['time-unit']}>
            <span>{timeUnit}</span>
          </div>
        </div>
        <div className={`
          ${styles.popularity}
          ${selected ? styles.selected : ''}
        `}>
          {[...Array(popularity)].map((_elem, key) => 
            <StarLogo 
              height='25px'
              key={key}
              width='25px'
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeRow;