import {
  FC
} from 'react';
import styles from './AddRecipe.module.scss';

export interface IAddRecipeProps {}

const AddRecipe: FC<IAddRecipeProps> = (props) => {

  return (
    <div className={styles['add-recipe']}> 
      Add Recipe! 
    </div>
  );
};

export default AddRecipe;