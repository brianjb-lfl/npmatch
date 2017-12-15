import * as actions from '../actions/opportunity'
import {opportunity as initialState} from './potential-states'

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_OPPORTUNITY) {
    return Object.assign({}, state, {
      id: action.id,
      idUser: action.idUser,
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

  else {
    return state;
  }

}