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

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchOppsList = (query, authToken) => dispatch => {
  
  dispatch(actionsDisplay.changeDisplay('loading'));

  const url = new URL(`${REACT_APP_BASE_URL}/api/opportunities/list`);
  Object.keys(query).forEach(key => url.searchParams.append(key, query[key]));
  
  console.log('url after query',url)
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
      
      return dispatch(loadOpportunitiesList(oppsList));
    })
    .catch(error => {
      // console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
