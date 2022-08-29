import {
  REQUEST_API,
  REQUEST_API_SUCCESSFUL,
  REQUEST_API_FAILURE,
} from '../actions';

const INITIAL_STATE = {
  error: null,
  isLoading: false,
  value: '',
  currencies: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return {
      ...state,
      isLoading: true,
      error: null,
    };

  case REQUEST_API_SUCCESSFUL:
    return {
      ...state,
      currencies: Object.keys(action.data),
      isLoading: false,
      error: null,
    };

  case REQUEST_API_FAILURE:
    return {
      ...state,
      error: action.error,
    };

  default:
    return state;
  }
};

export default wallet;
