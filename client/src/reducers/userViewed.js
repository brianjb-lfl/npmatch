import * as actions from '../actions/userViewed'
import {user as initialState} from './potentialStates'

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when viewing someone else's profile

export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
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
      bio: action.bio,
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