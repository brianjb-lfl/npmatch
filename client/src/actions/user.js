import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';
import  * as actionsUserViewed from './userViewed';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing YOUR OWN profile
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
  id: user.id,
  firstName: user.first_name,
  lastName: user.last_name,
  username: user.username,
  userType: user.user_type,
  organization: user.organization,
  locationCity: user.location_city,
  locationState: user.location_state,
  locationCountry: user.location_country,
  bio: user.bio,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  responses: user.responses, // array of objects
  adminOf: user.admin_of, // array of objects
  following: user.following, // array of objects
});


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, authToken, type = 'orgs', stateLocation = 'user') => dispatch => {
  // type options = 'users' and 'orgs'
  // state location options = 'user' and 'viewed'

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
      console.log('response from single user fetch',res)
      if (stateLocation === 'viewed') {
        dispatch(actionsUserViewed.loadUserViewed(res));   
        return dispatch(actionsDisplay.changeDisplay('loading'));
      } else {
        dispatch(loadUser(res));
        return dispatch(actionsDisplay.changeDisplay('loading'));        
      }
    })
    .catch(error => {
      console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}

