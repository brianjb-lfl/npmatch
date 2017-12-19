import * as actions from '../actions/user'
import {user as initialState} from './potential-states'
// import deepAssign from 'deep-assign';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const reducer = (state = initialState, action) => {

  if (action.type === actions.LOAD_USER) {
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

  if (action.type === actions.LOAD_RESPONSE) {
    let mutableResponses = {...state.responses}; // responses is 1-level deep; no need for deep-assign

    if (action.action === 'add') {
      mutableResponses[action.response.id] = action.response;
    } else if (action.action === 'edit') {
      mutableResponses[action.response.id] = action.response;
    } else if (action.action === 'delete') {
      delete mutableResponses[action.response.id];
    }
    return {...state, responses: mutableResponses };
  }

  if (action.type === actions.LOAD_ADMIN) {
    if (action.isNew) {
      const newAdmins = {...state.admins, [action.admin.id]: action.admin}
      return {...state, admins: newAdmins };
    } else {
      const newAdmins = {...state.admins, [action.admin.id]: null}
      return {...state, admins: newAdmins };
    }
  }

  if (action.type === actions.LOAD_FOLLOWING) {
    if (action.isNew) {
      const newFollowing = {...state.following, [action.following.id]: action.following}
      return {...state, following: newFollowing };
    } else {
      const newFollowing = {...state.following, [action.following.id]: null}
      return {...state, following: newFollowing };
    }
  }

  if (action.type === actions.SET_FORM_TYPE) {
    return {...state, formType: action.formType};
  }

  if (action.type === actions.TOGGLE_EDIT_LINK) {
    return {...state, links: action.links };
  }
  
  return state;


}