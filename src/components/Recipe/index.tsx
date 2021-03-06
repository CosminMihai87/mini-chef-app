import {
  FC
} from 'react';
import styles from './Recipe.module.scss';

export interface IRecipeProps {
  test?: string
}

const Recipe: FC<IRecipeProps> = (props) => {

  return (
    <div className={styles.recipe}>
      Recipe
    </div>
  );
};

export default Recipe;