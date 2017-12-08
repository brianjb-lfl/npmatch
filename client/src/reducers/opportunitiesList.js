import * as actions from '../actions/opportunitiesList'
import {opportunitiesList as initialState} from './potentialStates'

export const reducer = (state = initialState, action) => {
// console.log('action',action);
  if (action.type === actions.LOAD_OPPORTUNITIES_LIST) {
    return Object.assign({}, state, {
      main: action.main
    });
  }

  else {
    return state;
  }

}