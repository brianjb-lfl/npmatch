import * as actions from '../actions/opportunity'
import {opportunity as initialState} from './potential-states'

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_OPPORTUNITY) {
    return Object.assign({}, state, {
      id: action.id,
      userId: action.userId,
      organization: action.organization,
      opportunityType: action.opportunityType,
      offer: action.offer,
      title: action.title,
      narrative: action.narrative,
      timestampStart: action.timestampStart,
      timestampEnd: action.timestampEnd,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      link: action.link,
      causes: action.causes,
      responses: action.responses
    });
  }

  else if (action.type === actions.LOAD_RESPONSE) {
    let mutableResponses = Object.assign({}, state.responses); // responses is 1-level deep; no need for deep-assign

    if (action.action === 'add') {
      if (typeof mutableResponses === 'object') {
        mutableResponses.unshift(action.response);
      } else {
        mutableResponses = action.response;
      }
    } else if (action.action === 'edit' && typeof mutableResponses === 'object') {
      mutableResponses[action.index] = action.response;
    } else if (action.action === 'delete' && typeof mutableResponses === 'object') {
      mutableResponses.splice(action.index,1);
    }
    return Object.assign({}, state, {
      responses: mutableResponses,
    });
  }

  else {
    return state;
  }

}