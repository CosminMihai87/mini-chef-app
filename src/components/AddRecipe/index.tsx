
import {
  FC
} from 'react';
import styles from './AddRecipe.module.scss';
import IRecipe from '../../domain/IRecipe';
import { useFormik } from 'formik';
import { RecipeScope, RecipeTags, TimeUnits } from '../../domain/constants';
import { FwTextarea } from '../../shared/templates/Textarea';

const initialValues = {
  name: '',
  scope: RecipeScope.PRIVATE,
  tags: '',
  ingredientList: [],
  duration: {
    number: 0,
    timeUnit: TimeUnits.SECONDS
  },
  steps: [],
  popularity: 5
};

const onSubmit = (values: any) => {
  console.log('Form data', values)
}

const validate = (values: any) => {
  let errors = {}
  if (!values.name) {
    errors.name = 'Required'
  };
  if (!values.scope) {
    errors.scope = 'Required'
  };
  if (!values.tags) {
    errors.tags = 'Required'
  };
  if (!values.duration.number || !values.duration.timeUnit) {
    errors.duration.number = 'Required'
    errors.duration.timeUnit = 'Required'
  }; 
  if (!values.steps) {
    errors.steps = 'Required'
  };
  if (!values.popularity) {
    errors.popularity = 'Required'
  };
  return errors
}

const AddRecipe: FC<IRecipe> = (props) => {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  }) 

  return (
    <div className={styles['add-recipe']}> 
      <form onSubmit={formik.handleSubmit}>
        <div className={`form-control ${styles.name}`}>
          <label htmlFor='name'> 
            Name
          </label> 
          <FwTextarea
            setValue={setSearchValue}
            value={searchValue}
          />
          {formik.errors.name && formik.touched.name && 
            <div className={styles.error}>
              formik.errors.name
            </div>
          }
        </div>
      </form>
    </div>
  );
};

export default AddRecipe;