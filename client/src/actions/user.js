import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

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
  bio: user.bio,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  responses: user.responses, // array of objects
  adminOf: user.adminOf, // array of objects
  following: user.following, // array of objects
});


// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchUser = (userId, type, authToken) => dispatch => {
  /* searchCriteria should be an object with following props.
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
      dispatch(loadUser(res));
      return dispatch(actionsDisplay.changeDisplay('loading'));
      
    })
    .catch(error => {
      console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}

