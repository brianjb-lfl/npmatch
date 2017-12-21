import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const loadUsersList = (array) => ({
  type: LOAD_USERS_LIST,
  main: array
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUsersList = (query, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplay('loading'));

  const url = new URL(`${REACT_APP_BASE_URL}/api/users/list`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${authToken}`, 
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
      // console.log('response of users from fetch',res)
      return dispatch(loadUsersList(res));      
    })
    .catch(error => {
      // console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
