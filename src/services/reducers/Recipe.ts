import {
  CREATE_RECIPE,
  // UPDATE_RECIPE,
  // DELETE_RECIPE
} from '../actionTypes';

export const initialRecipeState = {
  loading: false,
  data: {},
  error: {}
};

export const recipeReducer = (state = initialRecipeState, action: any ) => {
  switch ( action.type ) {
  case CREATE_RECIPE.START: {
    return { 
      ...state, 
      loading: true 
    };
  }
  case CREATE_RECIPE.SUCCESS: {
    return { 
      ...state,
      loading: false,
      data: action.data
    };
  }
  case CREATE_RECIPE.FAIL: {
    return { 
      ...state,
      loading: false,
      error: action.error
    };
  }
  default: return state;
  }
};