import * as actions from '../actions/user'
import {user as initialState} from './potential-states'

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
    return Object.assign({}, state, {
      id: action.id,
      authToken: action.authToken,
      firstName: action.firstName,
      lastName: action.lastName,
      username: action.username,
      userType: action.userType,
      organization: action.organization,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      availability: action.availability,
      bio: action.bio,
      logo: action.logo,
      links: action.links, // array of objects
      causes: action.causes,
      skills: action.skills,
      responses: action.responses,
      adminOf: action.adminOf, // array of objects
      following: action.following, // array of objects);
    });
  }

  else if (action.type === actions.SET_FORM_TYPE) {
    return Object.assign({}, state, {
      formType: action.formType,
    });
  }

  else if (action.type === actions.TOGGLE_EDIT_LINK) {
    console.log('in reducer', action.links)
    return Object.assign({}, state, {
      links: action.links,
    });
  }
  
  else {
    return state;
  }

}