import {
  FC
} from 'react';
import styles from './RecipeBook.module.scss';

export interface IRecipeBookProps {}

const RecipeBook: FC<IRecipeBookProps> = (props) =>{
  return (
    <div className={styles['recipe-book']}>
      <h1>RecipeBook</h1>
    </div>
  );
};

export default RecipeBook;