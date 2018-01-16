import * as actions from '../actions/opportunity'
import {opportunity as initialState} from './potential-states'

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_OPPORTUNITY) {
    return {...state,
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
      responses: action.responses,
    };
  }

  if (action.type === actions.LOAD_OPP_RESPONSE) {
    const newResponses = {...state.responses, [action.response.id]: action.response};
    return {...state, responses: newResponses };
  }

  if (action.type === actions.UPDATE_START_DATE) {
    return {...state, newTimestampStart: action.newTimestampStart };
  }

  if (action.type === actions.UPDATE_END_DATE) {
    return {...state, newTimestampEnd: action.newTimestampEnd };
  }

  if (action.type === actions.INITIALIZE_START_DATE) {
    return {...state, timestampStart: action.timestampStart };
  }

  if (action.type === actions.INITIALIZE_END_DATE) {
    return {...state, timestampEnd: action.timestampEnd };
  }

  return state;
}