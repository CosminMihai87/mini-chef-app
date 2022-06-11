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
import { 
  initialRecipeState,
  recipeReducer
} from './reducers/Recipe';
import { 
  initialRecipesState,
  recipesReducer 
} from './reducers/Recipes';
import IRecipe from '../../src/domain/IRecipe';
import {
  CREATE_RECIPE,
  // UPDATE_RECIPE,
  DELETE_RECIPE,
  GET_RECIPES
} from './actionTypes';

const Services = () => {

  const [createRecipeState, dispatchCreateRecipe] = useReducer(recipeReducer, initialRecipeState);
  const [deleteRecipeState, dispatchDeleteRecipe] = useReducer(recipeReducer, initialRecipeState);
  const [getRecipesState, dispatchGetRecipes] = useReducer(recipesReducer, initialRecipesState);

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
        JSON.stringify({
          ...recipe, 
          addedOn: new Date(Date.now()).toISOString().split('.')[0]
        }),
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

  const deleteRecipe = useCallback((key: string ) => {
    dispatchDeleteRecipe({ 
      type:DELETE_RECIPE.START 
    });
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    axios(firebaseConfig.referenceURL)
      .delete(
        `/app-data/recipes-list/${key}.json`,
        requestHeader
      )
      .then((response: AxiosResponse) => {
        dispatchDeleteRecipe({
          type: DELETE_RECIPE.SUCCESS,
          data: response.data
        });
      })
      .catch((error: AxiosError) => {
        dispatchDeleteRecipe({
          type: DELETE_RECIPE.FAIL,
          error: error
        });
      });
  }, []);

  const getRecipes = useCallback(() => {
    dispatchGetRecipes({ 
      type: GET_RECIPES.START 
    });
    const requestHeader = {
      headers: {
        'Auth': firebaseConfig.apiKey,
        'content-type': 'application/x-www-form-urlencoded'
      }
    };
    axios(firebaseConfig.referenceURL)
      .get(
        '/app-data/recipes-list.json',
        requestHeader
      )
      .then((response: AxiosResponse) => {
        dispatchGetRecipes({
          type: GET_RECIPES.SUCCESS,
          data: response.data
        });
      })
      .catch((error: AxiosError) => {
        dispatchGetRecipes({
          type: GET_RECIPES.FAIL,
          error: error
        });
      });
  }, []);

  return {
    createRecipe: createRecipe,
    createRecipeState: createRecipeState,
    deleteRecipe: deleteRecipe,
    deleteRecipeState: deleteRecipeState,
    getRecipes: getRecipes,
    getRecipesState: getRecipesState
  };

};

export default Services;