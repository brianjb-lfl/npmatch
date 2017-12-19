import * as actions from '../actions/display'
import {display as initialState} from './potential-states'

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  
  if (action.type === actions.CHANGE_DISPLAY) {
    return {...state, view: action.view};
  }

  else if (action.type === actions.TOGGLE_MODAL) {
    return {...state, modal: !state.modal, modalMessage: action.message };
  }

  else if (action.type === actions.TOGGLE_USER) {
    return {...state, userId: action.userId };
  }

  else if (action.type === actions.TOGGLE_OPPORTUNITY) {
    return {...state, opportunityId: action.opportunityId };
  }

  return state;

}