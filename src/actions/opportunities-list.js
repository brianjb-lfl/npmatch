import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import * as actionsDisplay from './display';
import * as ck from './api-response-checks';

// right now we have 1 'main' list of opportunities; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does
export const LOAD_OPPORTUNITIES_LIST = 'LOAD_OPPORTUNITIES_LIST';
export const loadOpportunitiesList = array => ({
  type: LOAD_OPPORTUNITIES_LIST,
  main: array
})

export const PREPEND_OPPORTUNITIES_LIST = 'PREPEND_OPPORTUNITIES_LIST';
export const prependOpportunitiesList = opp => ({
  type: PREPEND_OPPORTUNITIES_LIST,
  opp
})

export const UPDATE_OPPORTUNITIES_LIST = 'UPDATE_OPPORTUNITIES_LIST';
export const updateOpportunitiesList = opp => ({
  type: UPDATE_OPPORTUNITIES_LIST,
  opp
})

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchOppsList = (query, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplayStatus('loading'));

  const url = new URL(`${REACT_APP_BASE_URL}/api/opportunities/list`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  
  const headers = {
    'content-type': 'application/json',
    "Authorization": `Bearer ${authToken}`, 
  };
  const init = { 
    method: 'GET',
    headers,
  };
  return fetch(url, init)    
    .then(res=>{
      return res.json();
    })
    .then(oppsList=>{
      ck.compareObjects(ck.getOpportunitiesListRes, oppsList)
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(loadOpportunitiesList(oppsList));
    })
    .catch(error => {
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
