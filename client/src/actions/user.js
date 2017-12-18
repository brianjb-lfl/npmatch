import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import * as actionsDisplay from './display';
import * as actionsUserViewed from './user-viewed';
import * as actionsOpportunity from './opportunity';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  id: user.username ? 3 : user.id, //FIX THIS SHIT
  authToken: user.authToken,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  userType: user.userType,
  organization: user.organization,
  locationCity: user.locationCity,
  locationState: user.locationState,
  locationCountry: user.locationCountry,
  availability: user.availability,
  bio: user.bio,
  logo: user.logo,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  responses: user.responses, // array of objects
  adminOf: user.adminOf, // array of objects
  following: user.following, // array of objects
});

export const LOAD_RESPONSE = 'LOAD_RESPONSE';
export const loadResponse = (response,index,action) => ({
  type: LOAD_RESPONSE,
  response,
  index,
  action,
});

export const LOAD_ADMIN = 'LOAD_ADMIN';
export const loadAdmin = (admin,index,isNew) => ({
  type: LOAD_ADMIN,
  admin,
  index,
  isNew,
});

export const LOAD_FOLLOWING = 'LOAD_FOLLOWING';
export const loadFollowing = (following,index,isNew) => ({
  type: LOAD_FOLLOWING,
  following,
  index,
  isNew,
});

export const SET_FORM_TYPE = 'SET_FORM_TYPE';
export const setFormType = formType => ({
  type: SET_FORM_TYPE,
  formType: formType,
});

export const TOGGLE_EDIT_LINK = 'TOGGLE_EDIT_LINK';
export const toggleEditLink = (index, edit = false, links) => {
  links[index].edit = edit;
  console.log('edited links', links)
  return {
    type: TOGGLE_EDIT_LINK,
    links,
  }
};

// @@@@@@@@@@@@@@@ ASYNC PRECURSORS @@@@@@@@@@@@@@@@@


export const manageLinks = (immutableUser, link, index, action) => dispatch => {

  const user = Object.assign({}, immutableUser);
  const isNew = false;
  console.log('user in manage links',user)
  if ( action === 'edit') {
    user.links[index] = link;
    user.links.edit = false;
  } else if ( action === 'delete') {
    user.links.splice(index,1);
  } else { // assume action === add
    user.links.push(link);
  }

  dispatch(createOrEditUser(user, isNew, user.authToken))
}

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, stateLocation = 'user') => dispatch => {
  // type options = 'users' and 'orgs'
  // state location options = 'user' and 'userViewed'

  dispatch(actionsDisplay.changeDisplay('loading'));
  
    const url = `${REACT_APP_BASE_URL}/api/users/${userId}`;
    const headers = {
      'content-type': 'application/json',
      "Authorization": `Bearer ${authToken}`, 
    }; 
  
    const init = { 
      method: 'GET',
      headers,
    };
    return fetch(url, init)   
    .then(res=>{
      return res.json();
    })
    .then(res=>{
      // console.log('response from single user fetch',res)
      if (stateLocation === 'userViewed') {
        dispatch(actionsUserViewed.loadUserViewed(res));   
      } else {
        dispatch(loadUser(res));
      }
      return;      
    })
    .catch(error => {
      // console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}

export const login = user => dispatch => {

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
  console.log('log in init',init)
  return fetch(url,init)
    .then(user => {
      return user.json()
    })
    .then(user=>{ 
      console.log('returned user', user)
      dispatch(loadUser(user));
    })
    .catch(error => {
      // console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    });
}

export const createOrEditUser = (user, isNew = true, authToken) => dispatch => {
  
    dispatch(actionsDisplay.changeDisplay('loading'));

    delete user.password2;
    delete user.authToken;
    const params = isNew ? 'register' : user.id ;
    const method = isNew ? 'POST' : 'PUT';

    const url = `${REACT_APP_BASE_URL}/api/users/${params}`;
    const headers = { 
      "Content-Type": "application/json",
    };
    if ( !isNew ) headers.Authorization = `Bearer ${authToken}`;

    const init = { 
      method,
      body: JSON.stringify(user),
      headers
    };
    console.log('init', init);
    return fetch(url, init)
    .then(res=>{ 
      console.log(res);
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      console.log('user returned at registration', user)
      return dispatch(loadUser(user));
    })
    .catch(error => {
      dispatch(actionsDisplay.toggleModal(error));
    });
}

/*

#######################

this.props.handleSubmit={(formValues)=>{addResponse(opportunity, formValues)}

const addResponse = (opportunity, formValues) {
  const response = {
    idOpportunity: opportunity.id,
    userId: this.props.user.id,
    notes: formValues.notes,
    responseStatus: 'offered',
    organization: opportunity.organization,
    firstName: this.props.user.firstName,
    lastName: this.props.user.lastName
    title: opportunity.title,
  }
  this.props.dispatch(actionsUser.createOrEditResponse(response, -1, this.props.user.authToken, true));
  then.props.dispatch(actionsDisplay.changeDisplay('normal'))
}

#######################

this.props.handleSubmit={(formValues)=>{editResponse(formValues, index)}
  // formValues.status === 'offered' || 'deleted' ==> available to respondants
  // formValues.status === 'accepted' || 'denied' ==> available to posters
  // control availability via React component

const editResponse = (response, index) {
  this.props.dispatch(actionsUser.createOrEditResponse(response, index, this.props.user.authToken, false));
  then.props.dispatch(actionsDisplay.changeDisplay('normal'))
}

*/

export const createOrEditResponse = (response, index, authToken, isNew = true) => dispatch => {
  /* response = {
    id: 0 // only is isNew !== true
    responseStatus: 'offered' || 'accepted' || 'denied' || 'deleted' // only if isNew !== true
    idOpportunity: 0,
    idUser: 0,
    title: 'title of opportunity, read from state at time of click'
    notes: 
  } */

  dispatch(actionsDisplay.changeDisplay('loading'));

  let action = 'edit' // action is used by reducer after response from server
  if (isNew) {
    action = 'add';
  } else if (response.responseStatus === 'deleted') {
    action = 'delete';
  }
  const loadTo = ( isNew || 
    response.responseStatus === 'offered' || 
    response.responseStatus === 'deleted' ) ? 'user' : 'opportunity' ;
  const params = isNew ? '' : response.id ;
  const method = isNew ? 'POST' : 'PUT';

  const url = `${REACT_APP_BASE_URL}/api/users/${params}`;
  const headers = { 
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  };

  const init = { 
    method,
    body: JSON.stringify(response),
    headers
  };
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{ 
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(returnedResponse => { 
    console.log('returnedResponse', returnedResponse)
    if ( loadTo === 'user') {
      return dispatch(loadResponse(returnedResponse,index,action));
    } else {
      return dispatch(actionsOpportunity.loadResponse(returnedResponse,index,action));
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

export const createOrDeleteRole = (role, index, authToken, isNew = true) => dispatch => {
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
  console.log('init', init);
  return fetch(url, init)
  .then(res=>{ 
    console.log(res);
    if (!res.ok) { 
      return Promise.reject(res.statusText);
    }
    return res.json();
  }) 
  .then(returnedRole => { 
    console.log('returnedRole', returnedRole)
    if ( isAdmin ) {
      return dispatch(loadAdmin(returnedRole, index, isNew));
    } else {
      return dispatch(loadFollowing(returnedRole, index, isNew));
    }
  })
  .catch(error => {
    dispatch(actionsDisplay.toggleModal(error));
  });
}