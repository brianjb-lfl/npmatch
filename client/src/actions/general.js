import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import * as actionsDisplay from './display';
import * as actionsUsersList from './users-list';

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

  const url = `${REACT_APP_BASE_URL}/api/admin/initialize`;
  const headers = {
    'content-type': 'application/json',
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
      dispatch(actionsUsersList.loadUsersList(res.users));
      return res;
    })
    .then(res => {
      dispatch(loadSkills(res.skills));
      return res;
    })
    .then(res => {
      return dispatch(loadCauses(res.causes));
    })
    .catch(error => {
      // console.log('error', error);
      return dispatch(actionsDisplay.toggleModal(error));
    })
}