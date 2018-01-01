import * as actions from '../actions/display'
import {display as initialState} from './potential-states'

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  
  if (action.type === actions.CHANGE_DISPLAY) {
    return {...state, view: action.view};
  }

  if (action.type === actions.CHANGE_DISPLAY_STATUS) {
    return {...state, status: action.status};
  }

  if (action.type === actions.TOGGLE_MODAL) {
    return {...state, modal: !state.modal, modalMessage: action.message };
  }

  if (action.type === actions.TOGGLE_USER) {
    return {...state, userId: action.userId };
  }

  if (action.type === actions.TOGGLE_OPPORTUNITY) {
    const idOpportunity = state.idOpportunity === action.idOpportunity ? null : action.idOpportunity ;
    return {...state, idOpportunity };
  }

  if (action.type === actions.TOGGLE_ROLE) {
    console.log('role', action)
    const idRole = state.idRole === action.idRole ? null : action.idRole ;
    const userId = state.userId === action.userId ? null : action.userId ;
    return {...state, idRole, userId };
  }

  // if (action.type === actions.SET_FORM_STATUS) {
  //   return {...state, formStatus: action.formStatus };
  // }

  if (action.type === actions.SAVE_LATEST_RESPONSE) {
    return {...state, latestResponse: action.latestResponse };
  }

  return state;

}