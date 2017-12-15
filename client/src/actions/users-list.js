import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

// right now we have 1 'main' list of users; we can have as many lists as we want, each following identical format
export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const loadUsersList = (array) => ({
  type: LOAD_USERS_LIST,
  main: array
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUsersList = (query, authToken, type = 'orgs') => dispatch => {
  // type options = 'users' and 'orgs'

  /* query should be an object with following props.
    values are priority, 1 being soonest for MVP
    {
      firstName         3 
      lastName          3 
      username          3 
      userType        1
      organization      3 
      locationCity      3
      locationState     3
      locationCountry   3
      bio                 9
      links               9
      causes           2
      skills:          2
      responses           4
      adminOf             4
      following           4
    }
  */
  
  // dispatch(actionsDisplay.changeDisplay('loading'));

  const url = new URL(`${REACT_APP_BASE_URL}/api/${type}/list`);
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
      console.log('response of users from fetch',res)
      return dispatch(loadUsersList(res));      
    })
    .catch(error => {
      // console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
