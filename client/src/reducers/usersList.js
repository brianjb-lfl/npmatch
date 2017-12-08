import * as actions from '../actions/usersList'
import {usersList as initialState} from './potentialStates'

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

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