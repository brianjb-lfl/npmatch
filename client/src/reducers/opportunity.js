import * as actions from '../actions/opportunity'
import {opportunity as initialState} from './potentialStates'

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_OPPORTUNITY) {
    return Object.assign({}, state, {
      id: action.id,
      firstName: action.firstName,
      lastName: action.lastName,
      username: action.username,
      userType: action.userType,
      organization: action.organization,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      bio: action.bio, // do we need this?
      links: action.links, // array of objects
      causes: action.causes,
      skills: action.skills,
      responses: action.responses,
      adminOf: action.adminOf, // array of objects
      following: action.following, // array of objects);
    });
  }

  else {
    return state;
  }

}