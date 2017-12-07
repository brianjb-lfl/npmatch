import * as actions from '../actions/users'
import * as state from './potentialStates'

const initialState = state.potentialStates.user;

export const reducer = (state = initialState, action) => {
  console.log('reducer', state)

  if (action.type === actions.LOAD_USER) {
    return Object.assign({}, state, {
      id: action.id,
      firstName: action.firstName,
      lastName: action.lastName,
      username: action.actionname,
      userType: action.userType,
      organization: action.organization,
      locationCity: action.locationCity,
      locationState: action.locationState,
      locationCountry: action.locationCountry,
      bio: action.bio, // do we need this?
      links: action.links, // array of objects
      causes: action.causes,
      skills: action.skills,
      adminOf: action.adminOf, // array of objects
      following: action.following, // array of objects);
    });
  }

  else {
    return state;
  }

}