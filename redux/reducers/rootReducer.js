/**
 * Se combinan todos los reductores para crear el reductor raiz.
 * 
 * Como su nombre lo dice, un reductor recude el numero de estados que
 * se modifican en el store, esto lo hace a traves de las acciones.
 */

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