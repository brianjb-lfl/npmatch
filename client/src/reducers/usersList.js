import * as actions from '../actions/usersList'
import {usersList as initialState} from './potentialStates'

export const reducer = (state = initialState, action) => {
  if (action.type === actions.LOAD_USERS_LIST) {
    return Object.assign({}, state, {
      main: action.main
    });
  }

  else {
    return state;
  }

}