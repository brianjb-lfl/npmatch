import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import * as actionsDisplay from './display';
import * as actionsUserViewed from './user-viewed';
import * as actionsOpportunity from './opportunity';
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

export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';
export const loadFollowing = following => ({
  type: LOAD_FOLLOWING,
  following,
});

export const SET_FORM_TYPE = 'SET_FORM_TYPE';
export const setFormType = formType => ({
  type: SET_FORM_TYPE,
  formType: formType,
});

export const TOGGLE_EDIT_LINK = 'TOGGLE_EDIT_LINK';
export const toggleEditLink = (index, edit = false, links) => {
  links[index].edit = edit;
  // console.log('edited links', links)
  return {
    type: TOGGLE_EDIT_LINK,
    links,
  }
};

// @@@@@@@@@@@@@@@ HELPERS @@@@@@@@@@@@@@@@@

export const stringArrayOfObjects=(array,key)=>{
  // input: [ {}, {} ]      output ['','']
  if (Array.isArray(array)) {
    return array.map(item=>item[key])
  }
  return [];
}

export const arrayToObject=(array,key='id')=>{
  const newObject = {};
  // input: [ {id:0}, {id:1} ]      output {0:{},1:{}}
  if (Array.isArray(array)) {
    array.forEach(item=>newObject[item[key]] = item);
    return newObject;
  }
  return {};
}

export const objectToArray=(object)=>{
  const newArray = [];
  // input {0:{},1:{}}         output: [ {}, {} ]      
  if (typeof object === 'object' && !Array.isArray(object)) {
    for (let prop in object) {
      newArray.push(object[prop]);
    }
    return newArray;
  }
  return [];
}

export const updateLinks = (links, link, index, action) => {
  const newLinks = [...links];
  // console.log('links in manage links',newLinks)
  if ( action === 'edit') {
    newLinks[index] = link;
    newLinks[index].edit = false;
  } else if ( action === 'delete') {
    newLinks.splice(index,1);
  } else { // assume action === add
    newLinks.push(link);
  }
  return newLinks;
}

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const userAPICall = (url, init, body, callback) => dispatch => {

  if (init.method === 'GET') { } 
  else if (init.method === 'POST' && !callback.isNew) { ck.compareObjects(ck.postAuthLogin, body)} 
  else if (init.method === 'POST') { ck.compareObjects(ck.postUsers, body) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putUsersId, body) }

  return fetch(url, init)   
  .then(user=>{ 
    if (!user.ok) { 
      return Promise.reject(user.statusText);
    }
    return user.json();
  })
  .then(user=>{
    // console.log('callback', callback)
    if (init.method === 'GET') { ck.compareObjects(ck.getUsersIdRes, user) }
    else if (init.method === 'POST') { ck.compareObjects(ck.postUsersRes, user)} 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putUsersIdRes, user) }

    if (callback.isNew) {
      return dispatch(login(callback.originalUser))
    }
    if (callback.stateLocation === 'userViewed') {
      return dispatch(actionsUserViewed.loadUser(user));   
    } 
    // console.log('returned user', user)
    // user.causes = stringArrayOfObjects(user.causes,        'cause');
    // user.skills = stringArrayOfObjects(user.skills,        'skill');
    user.following     = arrayToObject(user.following,     'id');    // id of org being followed
    user.admins        = arrayToObject(user.admins,        'id');    // id of user who is admin
    user.adminOf       = arrayToObject(user.adminOf,       'id');    // id of org user is admin of
    user.opportunities = arrayToObject(user.opportunities, 'id');
    user.responses     = arrayToObject(user.responses,     'idOpportunity');
    return dispatch(loadUser(user));
  })
  .catch(error => {
    // console.log('error',error);
    return dispatch(actionsDisplay.toggleModal(error));
  })
}

// @@@@@@@@@@@@@@@ ASYNC HEADER/URL FORMATTING @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, stateLocation = 'user') => dispatch => {   // state location options = 'user' and 'userViewed'

  dispatch(actionsDisplay.changeDisplay('loading'));
  
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
  }
  return dispatch(userAPICall(url, init, null, callback));
}

export const login = user => dispatch => {
  // console.log('user at login',{user})

  dispatch(actionsDisplay.changeDisplay('loading'));
  
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
  }
  // console.log(url, init, userObject, callback);
  return dispatch(userAPICall(url, init, userObject, callback));}

export const createOrEditUser = (user, authToken, isNew = true ) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplay('loading'));
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
    originalUser
  }
  return dispatch(userAPICall(url, init, user, callback));}

export const manageLinks = (user, link, index, action) => dispatch => {
  // add, edit, or delete links in user array, then update user in db
  const newLinks = updateLinks(user.links, link, index, action);
  const newUser = {...user, links: newLinks};
  const isNew = false; // user is not new
  return dispatch(createOrEditUser(newUser, user.authToken, isNew))
}

// @@@@@@@@@@@@@@@ USER RESPONSES TO OPPORTUNITIES @@@@@@@@@@@@@@@@@

export const createOrEditResponse = (origResponse, authToken, isNew = true) => dispatch => {
  const response = {...origResponse};
  // console.log('origResponse in createOrEditResponse', origResponse)
  // console.log('response in createOrEditResponse', response)
  /* response = {
    id: 0 // only is isNew !== true
    responseStatus: 'offered' || 'accepted' || 'denied' || 'deleted' // only if isNew !== true
    idOpportunity: 0,
    idUser: 0,
    title: 'title of opportunity, read from state at time of click'
    notes: 
  } */
  // console.log('response',response, authToken, isNew)

  // dispatch(actionsDisplay.changeDisplay('loading'));

  // let action = 'edit' // action is used by reducer after response from server
  // if (isNew) {
  //   action = 'add';
  // } else if (response.responseStatus === 'deleted') {
  //   action = 'delete';
  // }
  const loadTo = ( isNew || 
    response.responseStatus === 'offered' || 
    response.responseStatus === 'deleted' ) ? 'user' : 'opportunity' ;
  const params = isNew ? '' : response.id ;
  const method = isNew ? 'POST' : 'PUT';

  const url = `${REACT_APP_BASE_URL}/api/responses/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };
  // console.log('response transmitted', response)
  const init = { 
    method,
    body: JSON.stringify(response),
    headers
  };

  if (init.method === 'GET') { } 
  else if (init.method === 'POST') { ck.compareObjects(ck.postResponses, init.body) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putResponsesId, init.body) }
  
  return fetch(url, init)
  .then(res=>{ 

    if (!res.ok) { 
      console.log('not ok')
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(returnedResponse => { 

    if (init.method === 'GET') { } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postResponsesRes, returnedResponse) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putResponsesIdRes, returnedResponse) }

    if ( loadTo === 'user') {
      return dispatch(loadResponse(returnedResponse));
    } else {
      return dispatch(actionsOpportunity.loadResponse(returnedResponse));
    }
  })
  .catch(error => {
    dispatch(actionsDisplay.toggleModal(error));
  });
}

/*

#######################

user is logged in, can be used anywhere another user is shown
onClick={()=>{addRole(this.props.user.id, this.props.organization.id, 'following')}

org is logged in, to be used on org profile page
use menu or search to load userViewed, then enable button
onClick={()=>{addRole(this.props.userViewed.id, this.props.organization.id, 'admin')}

const addRole = (id, organization, capabilities) {
  const role = {
    idUserAdding: this.props.user.id,
    idUserReceiving: id,
    organization,
    capabilities,
  }
  this.props.dispatch(actionsUser.createOrDeleteRole(role, -1, this.props.user.authToken, true));
    .then(() => this.props.dispatch(actionsDisplay.changeDisplay('normal')) )
}

#######################

// when user is logged in, enable 'un-follow' for all users followed
  // track who is followed by comparing userList.id against user.following.idUserReceiving when ul is populated
// from org profile, show list of admins, enable on each admin
onClick={()=>{deleteRole(role, index)}

const deleteRole = (role, index) {
  this.props.dispatch(actionsUser.createOrDeleteRole(role, index, this.props.user.authToken, false));
    .then(() => this.props.dispatch(actionsDisplay.changeDisplay('normal')) )
}

*/

export const createOrDeleteRole = (role, authToken, isNew = true) => dispatch => {
  /* role = {
    id: for delete only
    idUserAdding:
    idUserReceiving:
    organization:
    capabilities:
  } */

  dispatch(actionsDisplay.changeDisplay('loading'));

  const params = isNew ? '' : role.id ;
  const method = isNew ? 'POST' : 'DELETE';
  const isAdmin = role.capabilities === 'admin' ? true : false ;

  const url = `${REACT_APP_BASE_URL}/api/users/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };

  const init = { 
    method,
    body: JSON.stringify(role),
    headers
  };

  if (init.method === 'GET') { } 
  else if (init.method === 'POST') { ck.compareObjects(ck.postRoles, init.body) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putRolesId, init.body) }
      
  return fetch(url, init)
  .then(res=>{ 
    // console.log('role res',res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(returnedRole => { 

    if (init.method === 'GET') { } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postRolesRes, returnedRole) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putRolesIdRes, returnedRole) }

    if ( isAdmin ) {
      return dispatch(loadAdmin(returnedRole, isNew));
    } else {
      return dispatch(loadFollowing(returnedRole, isNew));
    }
  })
  .catch(error => {
    dispatch(actionsDisplay.toggleModal(error));
  });
}