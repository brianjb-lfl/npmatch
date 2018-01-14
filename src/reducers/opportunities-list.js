import * as actions from '../actions/opportunities-list'
import {opportunitiesList as initialState} from './potential-states'

// right now we have 1 'main' list of opportunities; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const reducer = (state = initialState, action) => {
  if (action.type === actions.LOAD_OPPORTUNITIES_LIST) {
    return {...state, main: action.main };
  }

  if (action.type === actions.PREPEND_OPPORTUNITIES_LIST) {
    const opps = [action.opp, ...state.main]
    return {...state, main: opps };
  }

  if (action.type === actions.UPDATE_OPPORTUNITIES_LIST) {
    let index = 0;
    let found = -1;
    let newList = [...state.main];
    while (found < 0) {
      if(state.main[index].id === action.opp.id) {
        found = index;
      } else {
        index += 1;
      }
    }
    if (found >= 0 && index === 0) {
      newList = [
        action.opp,
        ...state.main.slice(index+1,state.main.length)
      ]
    } else if (found > 0 ){
      newList = [
        ...state.main.slice(0,index), 
        action.opp,
        ...state.main.slice(index+1,state.main.length)
      ]
    } 
    return {...state, main: newList };
  }

  return state;
}