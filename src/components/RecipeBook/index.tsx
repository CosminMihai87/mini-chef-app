import {
  FC
} from 'react';
import styles from './RecipeBook.module.scss';

export interface IRecipeBookProps {}

const RecipeBook: FC<IRecipeBookProps> = (props) =>{
  return (
    <div className={styles['recipe-book']}>
      RecipeBook
    </div>
  );
};

export default RecipeBook;