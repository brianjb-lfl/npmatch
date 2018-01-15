import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import  * as actionsDisplay from './display';
import * as helpers from './helpers';
import * as ck from './api-response-checks';
import * as actionsOpportunitiesList from './opportunities-list';
import * as actionsUser from './user';

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

export const LOAD_OPP_RESPONSE = 'LOAD_OPP_RESPONSE';
export const loadOppResponse = response => ({
  type: LOAD_OPP_RESPONSE,
  response,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@
export const oppAPICall = (url, init, body) => dispatch => {

  if (init.method === 'GET') { } 
  else if (init.method === 'POST') { ck.compareObjects(ck.postOpportunities, body) } 
  else if (init.method === 'PUT') { ck.compareObjects(ck.putOpportunitiesId, body) }

  return fetch(url, init)   
  .then(opp=>{
    if (!opp.ok) { 
      console.log('!ok')
      return Promise.reject(opp.statusText);
    }
    return opp.json();
  }) 
  .then(opportunity=>{
    console.log('opp returned', opportunity)

    if (init.method === 'GET') { ck.compareObjects(ck.getOpportunitiesIdRes, opportunity) } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postOpportunitiesRes, opportunity) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putOpportunitiesIdRes, opportunity) }
    
    if (Array.isArray(opportunity.responses)) {
      opportunity.responses = helpers.arrayToObject(opportunity.responses, 'id');
    }
    if (init.method === 'POST') {
      dispatch(actionsOpportunitiesList.prependOpportunitiesList(opportunity));  
      dispatch(actionsUser.loadUserOpportunity(opportunity));  
    }      
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    if (init.method === 'PUT') {
      dispatch(actionsOpportunitiesList.updateOpportunitiesList(opportunity));
    }
    dispatch(actionsDisplay.setOpportunity(opportunity.id));
    return dispatch(loadOpportunity(opportunity));      
  })
  .catch(error => {
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    return dispatch(actionsDisplay.toggleModal(error));
  })
}

export const fetchOpp = (oppId, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  
  const url = `${REACT_APP_BASE_URL}/api/opportunities/${oppId}`;
  const headers = {
    'content-type': 'application/json',
    'Authorization': `Bearer ${authToken}`, 
  }; 
  const init = { 
    method: 'GET',
    headers,
  };
  return dispatch(oppAPICall(url, init, null));
}

export const createOpportunity = (opportunity, authToken, isNew) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));

  if (isNew) delete opportunity.id;
  // DELETE WHEN DB ACCEPTS LOGO
  delete opportunity.logo;
  const params = isNew ? '' : `/${opportunity.id}` ;
  const method = isNew ? 'POST' : 'PUT' ;

  const url = `${REACT_APP_BASE_URL}/api/opportunities${params}`
  const headers = { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${authToken}`
  };
  const init = { 
    method,
    body: JSON.stringify(opportunity),
    headers
  };
  return dispatch(oppAPICall(url, init, opportunity));  
}