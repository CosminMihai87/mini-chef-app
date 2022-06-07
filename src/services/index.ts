import {
  useReducer, 
  useCallback 
} from 'react';
import {
  AxiosResponse, 
  AxiosError
} from 'axios';
import axios from '../shared/axiosInstance';
import { firebaseConfig } from '../shared/constants';
import recipeReducer from './reducers/Recipe';
import IRecipe from '../../src/domain/IRecipe';
import {
  CREATE_RECIPE
} from './actionTypes';

const Services = () => {

  const [createRecipeState, dispatchCreateRecipe] = useReducer(recipeReducer, {
    loading: false,
    data: {},
    error: {}
  });

  const createRecipe = useCallback((recipe: IRecipe ) => {
    dispatchCreateRecipe({ 
      type: CREATE_RECIPE.START 
    });
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    axios(firebaseConfig.referenceURL)
      .post(
        '/app-data/recipes-list.json',
        JSON.stringify(recipe),
        requestHeader
      )
      .then((response: AxiosResponse) => {
        dispatchCreateRecipe({
          type: CREATE_RECIPE.SUCCESS,
          data: response.data
        });
      })
      .catch((error: AxiosError) => {
        dispatchCreateRecipe({
          type: CREATE_RECIPE.FAIL,
          error: error
        });
      });
  }, []);

  return {
    createRecipe: createRecipe,
    createRecipeState: createRecipeState
  };

};

export default Services;