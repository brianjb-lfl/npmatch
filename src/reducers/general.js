import * as actions from '../actions/general'
import {general as initialState} from './potential-states'

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_CAUSES) {
    return {...state, causes: action.causes};
  }

  if (action.type === actions.LOAD_SKILLS) {
    return {...state, skills: action.skills };
  }

  if (action.type === actions.FLATTEN_LOCATIONS) {
    const flatStates = state.states.map(state=>{
      return state.name;
    })
    const flatCountries = state.countries.map(country=>{
      return country.name;
    })
    return {...state, states: flatStates, countries: flatCountries};
  }

  return state;

}