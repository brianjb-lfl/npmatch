import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page
export const LOAD_OPPORTUNITY = 'LOAD_OPPORTUNITY';
export const loadOpportunity = action => ({
  type: LOAD_OPPORTUNITY,
  id: action.id,
  userId: action.userId,
  organization: action.organization,
  opportunityType: action.opportunityType,
  offer: action.offer,
  title: action.title,
  narrative: action.narrative, // do we need this?
  timestampStart: action.timestampStart,
  timestampEnd: action.timestampEnd,
  locationCity: action.locationCity,
  locationState: action.locationState,
  locationCountry: action.locationCountry,
  link: action.link, // array of objects
  causes: action.causes,
  responses: action.responses,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchOpp = (oppId, type, authToken) => dispatch => {
  /* searchCriteria should be an object with following props.
    values are priority, 1 being soonest for MVP
    {
      userId                    6 
      organization              6
      opportunityType  1
      offer               2
      title            1
      narrative                 4
      timestampStart      2
      timestampEnd        2
      locationCity            3
      locationState           3
      locationCountry         3
      link:                     4
      causes           1
      responses                 5
    }
  */
  
  dispatch(actionsDisplay.changeDisplay('loading'));
  
    const url = `${REACT_APP_BASE_URL}/api/opportunities/${oppId}`;
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
      console.log('response from single opportunity fetch',res)
      dispatch(loadOpportunity(res));
      return dispatch(actionsDisplay.changeDisplay('loading'));
      
    })
    .catch(error => {
      console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}