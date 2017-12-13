import * as actions from '../actions/opportunities-list'
import {opportunitiesList as initialState} from './potentialStates'

// right now we have 1 'main' list of opportunities; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  if (action.type === actions.LOAD_OPPORTUNITIES_LIST) {
    return Object.assign({}, state, {
      main: action.main
    });
  }

  else {
    return state;
  }

}