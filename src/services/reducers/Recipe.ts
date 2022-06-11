import {
  CREATE_RECIPE,
  UPDATE_RECIPE,
  DELETE_RECIPE
} from '../actionTypes';

export const initialRecipeState = {
  loading: false,
  data: null,
  error: {}
};

export const recipeReducer = (state = initialRecipeState, action: any ) => {
  switch ( action.type ) {
  case CREATE_RECIPE.START: 
  case UPDATE_RECIPE.START: 
  case DELETE_RECIPE.START: {
    return { 
      ...state, 
      loading: true 
    };
  }
  case CREATE_RECIPE.SUCCESS: 
  case UPDATE_RECIPE.SUCCESS: 
  case DELETE_RECIPE.SUCCESS: {
    return { 
      ...state,
      loading: false,
      data: action.data
    };
  }
  case CREATE_RECIPE.FAIL: 
  case UPDATE_RECIPE.FAIL: 
  case DELETE_RECIPE.FAIL: {
    return { 
      ...state,
      loading: false,
      error: action.error
    };
  }
  default: return state;
  }
};