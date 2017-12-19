import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import  * as actionsDisplay from './display';
import { arrayToObject } from './user';

// this is all detail for 1 opportunity; we should only need one at a time;
// this would be used when creating, editing, or viewing all detail of a single opportunity, like an event profile page
export const LOAD_OPPORTUNITY = 'LOAD_OPPORTUNITY';
export const loadOpportunity = action => ({
  type: LOAD_OPPORTUNITY,
  id: action.id,
  userId: action.userId,
  organization: action.organization,
  opportunityType: action.opportunityType,
  offer: action.offer || false,
  title: action.title,
  narrative: action.narrative, 
  timestampStart: action.timestampStart,
  timestampEnd: action.timestampEnd,
  locationCity: action.locationCity,
  locationState: action.locationState,
  locationCountry: action.locationCountry,
  link: action.link,
  causes: action.causes,
  responses: action.responses,
});


export const LOAD_RESPONSE = 'LOAD_RESPONSE';
export const loadResponse = response => ({
  type: LOAD_RESPONSE,
  response,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchOpp = (oppId, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplay('loading'));
  
    const url = `${REACT_APP_BASE_URL}/api/opportunities/${oppId}`;
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
    .then(opportunity=>{
      opportunity.responses = arrayToObject(opportunity.responses, 'id');
      return dispatch(loadOpportunity(opportunity));      
    })
    .catch(error => {
      return dispatch(actionsDisplay.toggleModal(error));
    })
}

export const createOpportunity = (opportunity, authToken, isNew) => dispatch => {
  
    dispatch(actionsDisplay.changeDisplay('loading'));

    // conform data format
    if (typeof opportunity.offer === 'string') {
      if ( opportunity.offer.substring(0,5) === 'offer' ) {
        opportunity.offer = true;
      } else {
        opportunity.offer = false;
      }  
    }

    if ( typeof opportunity.locationState === 'object' ) {
      opportunity.locationState = opportunity.locationState.abbreviation;
    } 

    if ( typeof opportunity.locationCountry === 'object' ) {
      opportunity.locationCountry = opportunity.locationCountry.code;
    } 
    
    if (isNew) delete opportunity.id;
    // DELETE THIS WHEN BRIAN ADDS TO DB
    delete opportunity.organization;
    const params = isNew ? '' : `/${opportunity.id}` ;
    const method = isNew ? 'POST' : 'PUT' ;

    const url = `${REACT_APP_BASE_URL}/api/opportunities${params}`
    const headers = { 
      "Content-Type": "application/json",
      "Authorization": `Bearer ${authToken}`
    };
    const init = { 
      method,
      body: JSON.stringify(opportunity),
      headers
    };
    // console.log('create opp',init)
    return fetch(url, init)
    .then(res=>{
      if (!res.ok) { 
        return Promise.reject(res.statusText);
      }
      return res.json();
    }) 
    .then(user => { 
      return dispatch(loadOpportunity(user));
    })
    .catch(error => {
      dispatch(actionsDisplay.toggleModal(error));
    });
  }