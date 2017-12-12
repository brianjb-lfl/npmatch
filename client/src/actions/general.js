import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import { SubmissionError } from 'redux-form';
import * as actionsDisplay from './display';
import * as actionsUsersList from './usersList';

// library of all causes, loads once only on app load
export const LOAD_CAUSES = 'LOAD_CAUSES';
export const loadCauses = causes => ({
  type: LOAD_CAUSES,
  causes
});

export const LOAD_SKILLS = 'LOAD_SKILLS';
export const loadSkills = skills => ({
  type: LOAD_SKILLS,
  skills
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchInitialize = () => dispatch => {

  const url = `${REACT_APP_BASE_URL}/api/initialize`;
  const headers = {
    'content-type': 'application/json',
    // "Authorization": `Bearer ${authToken}`, 
  };

  const init = {
    method: 'GET',
    headers,
  };
  return fetch(url, init)
    .then(res => {
      return res.json();
    })
    .then(res => {
      console.log('response from initialize fetch', res)
      dispatch(actionsUsersList.loadUsersList(res.usersList));
      return res;
    })
    .then(res => {
      dispatch(loadSkills(res.skills));
      return res;
    })
    .then(res => {
      return dispatch(loadCauses(res.causes));
    })
    .then(res => { return dispatch(actionsDisplay.changeDisplay('homePage')); })
    .catch(error => {
      console.log('error', error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}

