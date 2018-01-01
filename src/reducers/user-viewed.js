import * as actions from '../actions/user-viewed'
import {user as initialState} from './potential-states'

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when viewing someone else's profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER_VIEWED) {
    return {...state,
      id: action.id,
      username: action.username,
      userType: action.userType,
      firstName: action.firstName,
      lastName: action.lastName,
      organization: action.organization,
      logo: action.logo,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      availability: action.availability,
      bio: action.bio,
      authToken: action.authToken,
      links: action.links,
      causes: action.causes,
      skills: action.skills,
      adminOf: action.adminOf, 
      admins: action.admins,
      following: action.following,
      opportunities: action.opportunities,
      responses: action.responses,
    };
  }

  return state;

}