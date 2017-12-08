import * as actions from '../actions/display'
import {display as initialState} from './potentialStates'

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  if (action.type === actions.CHANGE_DISPLAY) {
    return Object.assign({}, state, {
      view: action.view
    });
  }

  else {
    return state;
  }

}