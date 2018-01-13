import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
// import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';
import * as ck from './api-response-checks';

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const loadUsersList = (array) => ({
  type: LOAD_USERS_LIST,
  main: array
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUsersList = (query, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));

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
  // console.log('init at users list',init)
  return fetch(url, init)    
    .then(res=>{
      return res.json();
    })
    .then(usersList=>{
      ck.compareObjects(ck.getUsersListRes, usersList );
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(loadUsersList(usersList));      
    })
    .catch(error => {
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
