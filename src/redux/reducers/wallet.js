import { CHANGE_WALLET } from '../actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_WALLET:
    return {
      ...state,
      wallet: action.value,
    };
  default:
    return state;
  }
};

export default user;
