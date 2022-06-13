import {
  GET_RECIPES
} from '../actionTypes';

export const initialRecipesState = {
  loading: false,
  data: {},
  error: {}
};

export const recipesReducer = (state = initialRecipesState, action: any ) => {
  switch ( action.type ) {
  case GET_RECIPES.START: {
    return { 
      ...state, 
      loading: true 
    };
  }
  case GET_RECIPES.SUCCESS: {
    return { 
      ...state,
      loading: false,
      data: action.data === null ? {} : action.data
    };
  }
  case GET_RECIPES.FAIL: {
    return { 
      ...state,
      loading: false,
      error: action.error
    };
  }
  default: return state;
  }
};