import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import  * as actionsDisplay from './display';
import * as helpers from './helpers';
import * as ck from './api-response-checks';
import * as actionsOpportunitiesList from './opportunities-list';
import * as actionsUser from './user';
import { store } from '../store';

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

export const UPDATE_START_DATE = 'UPDATE_START_DATE';
export const updateStartDate = newTimestampStart => ({
  type: UPDATE_START_DATE,
  newTimestampStart,
});

export const UPDATE_END_DATE = 'UPDATE_END_DATE';
export const updateEndDate = newTimestampEnd => ({
  type: UPDATE_END_DATE,
  newTimestampEnd,
});

// @@@@@@@@@@@@@@@ INTERMEDIARY @@@@@@@@@@@@@@@@@

export const handleDateChanges = (dateType, timestamp) => dispatch => {
  // input: dateType = 'start' or 'end'; timestamp is recently changed timestamp in form 
  // Problem: Redux datetimepicker changes BOTH date and time, when user intends to change ONLY date or time.
  // Solution: this function formats an action to update correctly.
  // 1. decides which action to call (start or end) per parameter;
  // 2. grabs prior date from Redux store. Bad practice for actions, but this is to prevent an infinite loop in the component;
  // 3. calls helper function resolveDateTimeConflicts (read more there);
  // 4. dispatches action.
  
  const opportunity = {...store.getState().opportunity};

  let priorDate, updateFunction;
  if (dateType === 'start') {
    priorDate = opportunity.newTimestampStart ? new Date(opportunity.newTimestampStart) : new Date(opportunity.timestampStart);
    updateFunction = updateStartDate;
  } else {
    priorDate = opportunity.newTimestampEnd ? new Date(opportunity.newTimestampEnd) : new Date(opportunity.timestampEnd);
    updateFunction = updateEndDate;
  }
  const conformedDate = helpers.resolveDateTimeConflicts(priorDate, timestamp);
  dispatch(updateFunction(conformedDate))
}

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
    
    const timestampStart = opportunity.timestampStart ? helpers.convertStringToTimeStamp(opportunity.timestampStart) : {} ;
    const timestampEnd = opportunity.timestampEnd ? helpers.convertStringToTimeStamp(opportunity.timestampEnd) : {} ;
    const responses = Array.isArray(opportunity.responses) ? helpers.arrayToObject(opportunity.responses, 'id') : [] ;

    if (init.method === 'GET') { ck.compareObjects(ck.getOpportunitiesIdRes, opportunity) } 
    else if (init.method === 'POST') { ck.compareObjects(ck.postOpportunitiesRes, opportunity) } 
    else if (init.method === 'PUT') { ck.compareObjects(ck.putOpportunitiesIdRes, opportunity) }
    
    const updatedOpportunity = {...opportunity, timestampStart, timestampEnd, responses};

    if (init.method === 'POST') {
      dispatch(actionsOpportunitiesList.prependOpportunitiesList(updatedOpportunity));  
      dispatch(actionsUser.loadUserOpportunity(updatedOpportunity));  
    }      
    dispatch(actionsDisplay.changeDisplayStatus('normal'));
    if (init.method === 'PUT') {
      dispatch(actionsOpportunitiesList.updateOpportunitiesList(updatedOpportunity));
    }
    dispatch(actionsDisplay.setOpportunity(updatedOpportunity.id));
    return dispatch(loadOpportunity(updatedOpportunity));      
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