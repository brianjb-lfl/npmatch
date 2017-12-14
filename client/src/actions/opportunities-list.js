import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

// right now we have 1 'main' list of opportunities; we can have as many lists as we want, each following identical format
// if we add lists, each one should have an action and reducer; each one can populate 1 key, like "main" does

export const LOAD_OPPORTUNITIES_LIST = 'LOAD_OPPORTUNITIES_LIST';
export const loadOpportunitiesList = (array) => ({
  type: LOAD_OPPORTUNITIES_LIST,
  main: array
})

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchOppsList = (searchCriteria, authToken) => dispatch => {
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

  const url = `${REACT_APP_BASE_URL}/api/opportunities/list`;
  const headers = {
    'content-type': 'application/json',
    // "Authorization": `Bearer ${authToken}`, 
  }; 

  const init = { 
    method: 'GET',
    headers,
    body: JSON.stringify(searchCriteria)
  };
  return fetch(url, init)    
    .then(res=>{
      return res.json();
    })
    .then(res=>{
      console.log('response from opps list fetch',res)
      return dispatch(loadOpportunitiesList(res));
    })
    .catch(error => {
      console.log('error',error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}
