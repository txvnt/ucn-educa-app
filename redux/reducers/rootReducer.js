import { combineReducers } from 'redux';
import user from './user'
import { CLEAN_STATE } from '../actionsTypes';

const appReducer = combineReducers({
  user,
});

export default (state, action) => {
  if (action.type === CLEAN_STATE) {
    state = undefined;
  }

  return appReducer(state, action)
}