import {
  CREATE_RECIPE,
  // READ_RECIPE,
  // UPDATE_RECIPE,
  // DELETE_RECIPE
} from '../actionTypes';

const initialState = {
  loading: false,
  data: {},
  error: {}
};

const recipeReducer = (state = initialState, action: any ) => {
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

export default recipeReducer;