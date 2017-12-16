import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';
import  * as actionsUserViewed from './user-viewed';

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

export const SET_FORM_TYPE = 'SET_FORM_TYPE';
export const setFormType = formType => ({
  type: SET_FORM_TYPE,
  formType: formType,
});


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, type = 'orgs', stateLocation = 'user') => dispatch => {
  // type options = 'users' and 'orgs'
  // state location options = 'user' and 'userViewed'

  dispatch(actionsDisplay.changeDisplay('loading'));
  
    const url = `${REACT_APP_BASE_URL}/api/${type}/${userId}`;
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

export const login = (user) => dispatch => {

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
    const params = isNew ? 'register' : user.id ;
    const method = isNew ? 'POST' : 'PUT';

    const url = `${REACT_APP_BASE_URL}/api/users/${params}`;
    const headers = { 
      "Content-Type": "application/json",
      "x-requested-with": "xhr" 
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
    .then(()=>{
      return dispatch(actionsDisplay.changeDisplay('normal'));
    })
    .catch(error => {
      dispatch(actionsDisplay.toggleModal(error));
    });
  }