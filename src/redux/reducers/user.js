// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CHANGE_EMAIL } from '../actions';

const INITIAL_STATE = {};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CHANGE_EMAIL:
    return {
      ...state,
      email: action.value,
    };
  default:
    return state;
  }
};

export default user;
