import * as actions from '../actions/general'
import {general as initialState} from './potential-states'

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_CAUSES) {
    return Object.assign({}, state, {
      causes: action.causes // array of strings;
    });
  }

  else if (action.type === actions.LOAD_SKILLS) {
    return Object.assign({}, state, {
      skills: action.skills // array of strings;
    });
  }

  else {
    return state;
  }

}