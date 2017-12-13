import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';
import  * as actionsUserViewed from './user-viewed';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  id: user.id,
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


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, type = 'orgs', stateLocation = 'user') => dispatch => {
  // type options = 'users' and 'orgs'
  // state location options = 'user' and 'userViewed'

  dispatch(actionsDisplay.changeDisplay('loading'));
  
    const url = `${REACT_APP_BASE_URL}/api/${type}/${userId}`;
    const headers = {
      'content-type': 'application/json',
      // "Authorization": `Bearer ${authToken}`, 
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
  const auth = `${user.username}:${user.password}`; // u & pw as string
  const headers = {
    "Authorization": "Basic " + btoa(auth), // base64 encryption
    // "x-requested-with": "xhr"
  }; 
  const init = { 
    method: 'POST',
    headers
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

export const newUser = (credentials) => dispatch => {
  
    dispatch(actionsDisplay.changeDisplay('loading'));
    
    const url = `${REACT_APP_BASE_URL}/api/users/register`;
    const headers = { "Content-Type": "application/json",
      "x-requested-with": "xhr" };
    const init = { 
      method: 'POST',
      body: JSON.stringify(credentials),
      headers
    };
    console.log('init', init);
    return fetch(url, init)
    .then(res=>{ //response user api repr firstName, lastName, username, id
      console.log(res);
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      user.quizzes = [];
      user.recent = [];
      user.badges = [];
      dispatch(updateUserStore(user));
    })
    .then(()=>{
      return dispatch(actionsMode.changeMode('login'));
    })
    .catch(error => {
      dispatch(actionsMode.showModal(error));
    });
  }