import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import * as actionsDisplay from './display';
import * as actionsUserViewed from './user-viewed';
import * as actionsOpportunity from './opportunity';
import * as helpers from './helpers';
import * as ck from './api-response-checks';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  id: user.id,
  username: user.username,
  userType: user.userType,
  firstName: user.firstName,
  lastName: user.lastName,
  organization: user.organization,
  logo: user.logo,
  locationCity: user.locationCity,
  locationState: user.locationState,
  locationCountry: user.locationCountry,
  availability: user.availability,
  bio: user.bio,
  authToken: user.authToken,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  adminOf: user.adminOf, // array of objects
  admins: user.admins,
  following: user.following, // array of objects
  opportunities: user.opportunities,
  responses: user.responses,
});

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = user => ({
  type: UPDATE_USER,
  id: user.id,
  username: user.username,
  userType: user.userType,
  firstName: user.firstName,
  lastName: user.lastName,
  organization: user.organization,
  logo: user.logo,
  locationCity: user.locationCity,
  locationState: user.locationState,
  locationCountry: user.locationCountry,
  availability: user.availability,
  bio: user.bio,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
});

export const LOGOUT = 'LOGOUT';
export const logout = () => ({
  type: LOGOUT,
});

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
export const loadResponse = response => ({
  type: LOAD_RESPONSE,
  response,
});

export const LOAD_ADMIN = 'LOAD_ADMIN';
export const loadAdmin = admin => ({
  type: LOAD_ADMIN,
  admin,
});

export const LOAD_USER_OPPORTUNITY = 'LOAD_USER_OPPORTUNITY';
export const loadUserOpportunity = opportunity => ({
  type: LOAD_USER_OPPORTUNITY,
  opportunity,
});

export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';
export const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const userAPICall = (url, init, body, callback) => dispatch => {

  if (init.method === 'GET') { } 
  else if (init.method === 'POST' && !callback.isNew) { ck.compareObjects(ck.postAuthLogin, body)} 
  else if (init.method === 'POST') { ck.compareObjects(ck.postUsers, body) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putUsersId, body) }
  // console.log('just before user api call',init)
  return fetch(url, init)   
  .then(user=>{ 
    if (!user.ok) { 
      return Promise.reject(user.statusText);
    }
    return user.json();
  })
  .then(user=>{
    // console.log('user returned', user)
    if (init.method === 'GET') { ck.compareObjects(ck.getUsersIdRes, user) }
    else if (init.method === 'POST' && !callback.isNew) { ck.compareObjects(ck.getUsersIdRes, user)} 
    else if (init.method === 'POST') { ck.compareObjects(ck.postUsersRes, user)} 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putUsersIdRes, user) }

    if (callback.isNew) {
      dispatch(actionsDisplay.setUser(user.id))
      dispatch(login(callback.originalUser))
    } else if (callback.stateLocation === 'userViewed') {
      dispatch(actionsDisplay.setUser(user.id));   
      dispatch(actionsUserViewed.loadUserViewed(user));   
    } else if (callback.loadTo === 'loadUser') {
      const following     = helpers.arrayToObject(user.following,     'idUserReceiving'); // id of org being followed
      const admins        = helpers.arrayToObject(user.admins,        'idUserReceiving'); // id of user who is admin
      const adminOf       = helpers.arrayToObject(user.adminOf,       'idUserAdding');    // id of org user is admin of
      const opportunities = helpers.arrayToObject(user.opportunities, 'id');
      const responses     = helpers.arrayToObject(user.responses,     'idOpportunity');
      
      const formattedUser = {...user, following, admins, adminOf, opportunities, responses}
      dispatch(actionsDisplay.setUser(formattedUser.id))
      dispatch(loadUser(formattedUser));
    } else if (callback.loadTo === 'updateUser') {
      dispatch(actionsDisplay.setUser(user.id));   
      dispatch(updateUser(user));
    }
    return dispatch(actionsDisplay.changeDisplayStatus('normal'));
  })
  .catch(error => {
    // console.log('error',error);
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    return dispatch(actionsDisplay.toggleModal(error));
  })
}

// @@@@@@@@@@@@@@@ ASYNC HEADER/URL FORMATTING @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, stateLocation = 'user', loadTo = 'updateUser') => dispatch => {   // state location options = 'user' and 'userViewed'

  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  
  const url = `${REACT_APP_BASE_URL}/api/users/${userId}`;
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${authToken}`, 
  }; 
  const init = { 
    method: 'GET',
    headers,
  };
  const callback = {
    isNew: false,
    stateLocation,
    originalUser: null,
    loadTo,
  }
  const body = null;
  return dispatch(userAPICall(url, init, body, callback));
}

export const login = user => dispatch => {
  // console.log('user at login',{user})

  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  
  const url = `${REACT_APP_BASE_URL}/api/auth/login`;
  const userObject = {
    username: user.username,
    password: user.password
  };

  const headers = {
    "Content-Type": "application/json"
  }; 
  const init = { 
    method: 'POST',
    headers,
    body: JSON.stringify(userObject)
  };
  const callback = {
    isNew: false,
    stateLocation: 'user',
    originalUser: null,
    loadTo: 'loadUser',
  }
  // console.log('login', url, init, userObject, callback);
  return dispatch(userAPICall(url, init, userObject, callback));
}

export const createOrEditUser = (user, authToken, isNew = true, loadTo = 'updateUser' ) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  const originalUser = {username: user.username, password: user.password};
  delete user.password2; // maybe set to null???
  delete user.authToken;
  user.organization = user.organization ? user.organization : null ;
  user.firstName = user.firstName ? user.firstName : null ;
  user.lastName = user.lastName ? user.lastName : null ;

  const params = isNew ? 'register' : user.id ;
  const method = isNew ? 'POST' : 'PUT';

  const url = `${REACT_APP_BASE_URL}/api/users/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
  };
  if ( !isNew ) headers.Authorization = `Bearer ${authToken}`;

  const init = { 
    method,
    body: JSON.stringify(user),
    headers
  };
  const callback = {
    isNew,
    stateLocation: 'user',
    originalUser,
    loadTo,
  }
  // console.log('login dispatch')
  return dispatch(userAPICall(url, init, user, callback));}

// @@@@@@@@@@@@@@@ USER RESPONSES TO OPPORTUNITIES @@@@@@@@@@@@@@@@@

export const createOrEditResponse = (origResponse, authToken, isNew = true) => dispatch => {
  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  const response = {...origResponse};

  const loadTo = ( isNew || 
    response.responseStatus === 'offered' || 
    response.responseStatus === 'deleted' ) ? 'user' : 'opportunity' ;
  const params = isNew ? '' : response.id ;
  const method = isNew ? 'POST' : 'PUT';

  const {id, idOpportunity, userId, notes, responseStatus} = response; // send back only keys that server expects
  const newResponse = {id, idOpportunity, userId, notes, responseStatus};
  if (isNew) delete response.id;

  console.log('orig', origResponse)
  console.log('response', response)
  console.log('newResponse', newResponse)
  
  const url = `${REACT_APP_BASE_URL}/api/responses/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
  const init = { 
    method,
    body: JSON.stringify(newResponse),
    headers
  };
  console.log('init', init)
  if (init.method === 'GET') { } 
  else if (init.method === 'POST') { ck.compareObjects(ck.postResponses, newResponse) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putResponsesId, newResponse) }
  
  return fetch(url, init)
  .then(res=>{ 

    if (!res.ok) { 
      // console.log('not ok')
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(returnedResponse => { 
    // console.log('response', returnedResponse);
    if (init.method === 'GET') { } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postResponsesRes, returnedResponse) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putResponsesIdRes, returnedResponse) }

    if (init.method === 'POST') {
      // this saves the id of the lastest response, which is then available to the component; this prevents duplication of responses in the event that a user creates a response, then tries to edit it before refreshing the parent component
      dispatch(actionsDisplay.saveLatestResponse(returnedResponse.id))
    }
    if ( loadTo === 'user') {
      dispatch(loadResponse(returnedResponse)); // if user is logged in, update them (they will be updated when logging in otherwise)
    } else {
      dispatch(actionsOpportunity.loadOppResponse(returnedResponse)); // otherwise, update the opportunity in focus
    }
    return dispatch(actionsDisplay.changeDisplayStatus('normal'));
  })
  .catch(error => {
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    dispatch(actionsDisplay.toggleModal(error));
  });
}

// @@@@@@@@@@@@@@@ ROLES @@@@@@@@@@@@@@@@@

export const createOrEditRole = (role, roleType, authToken, roleNameFields) => dispatch => {
  console.log('enter role', role, roleNameFields)

  dispatch(actionsDisplay.changeDisplayStatus('loading'));

  const isNew = role.id ? false : true ;
  const params = isNew ? '' : role.id ;
  const method = isNew ? 'POST' : 'PUT';

  const url = `${REACT_APP_BASE_URL}/api/roles/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
  const {id, idUserAdding, idUserReceiving, capabilities} = role; // send back only keys that server expects
  const newRole = {id, idUserAdding, idUserReceiving, capabilities};
  if(isNew) delete newRole.id;

  const init = { 
    method,
    body: JSON.stringify(newRole),
    headers
  };

  if (init.method === 'GET') { } 
  else if (init.method === 'POST') { ck.compareObjects(ck.postRoles, role) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putRolesId, role) }
  console.log('role before fetch', url, init)

  return fetch(url, init)
  .then(res=>{ 
    // console.log('role res',res);
    if (!res.ok) { 
      // console.log('not ok');
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(rawReturnedRole => { 
    // console.log('returnedRole', rawReturnedRole)
    if (init.method === 'GET') { } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postRolesRes, rawReturnedRole) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putRolesIdRes, rawReturnedRole) }
    
    let returnedRole = {...rawReturnedRole, ...roleNameFields}; // server isn't sending back name, organization, etc., so we hold on, and add them back here

    if (rawReturnedRole.message === 'Role deleted') {
        returnedRole = {...role, ...roleNameFields};
    }
    // console.log('returnedRole hydrated',returnedRole)
    if ( roleType === 'admin' ) {
      // if (returnedRole.capabilities === 'admin') // vs 'delete'
      dispatch(loadAdmin(returnedRole, isNew));
    } else {
      dispatch(loadFollowing(returnedRole, isNew));
    }
    dispatch(actionsDisplay.saveLatestRole(returnedRole.id));
    return dispatch(actionsDisplay.changeDisplayStatus('normal'));
  })
  .catch(error => {
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    dispatch(actionsDisplay.toggleModal('error'));
  });
}