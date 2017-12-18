import * as actions from '../actions/user'
import {user as initialState} from './potential-states'
import deepAssign from 'deep-assign';

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

  else if (action.type === actions.LOAD_ADMIN) {
    let mutableAdmins = deepAssign({}, state.admins);

    if (action.isNew) {
      if (typeof mutableAdmins === 'object') {
        mutableAdmins.unshift(action.admin);
      } else {
        mutableAdmins = action.admin;
      }
    } else if (!action.isNew && typeof mutableAdmins === 'object') {
      mutableAdmins.splice(action.index, 1);
    }
    return Object.assign({}, state, {
      admins: mutableAdmins,
    });
  }

  else if (action.type === actions.LOAD_FOLLOWING) {
    let mutableFollowing = deepAssign({}, state.following);

    if (action.isNew) {
      if (typeof mutableFollowing === 'object') {
        mutableFollowing.unshift(action.following);
      } else {
        mutableFollowing = action.following;
      }
    } else if (!action.isNew && typeof mutableFollowing === 'object') {
      mutableFollowing.splice(action.index, 1);
    }
    return Object.assign({}, state, {
      following: mutableFollowing,
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