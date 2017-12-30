import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import * as actionsDisplay from './display';
import * as actionsUsersList from './users-list';
import * as ck from './api-response-checks';

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

export const FLATTEN_LOCATIONS = 'FLATTEN_LOCATIONS';
export const flattenLocations = () => ({
  type: FLATTEN_LOCATIONS,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

export const fetchInitialize = () => dispatch => {

  dispatch(actionsDisplay.changeDisplayStatus('loading'));
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
      ck.compareObjects(ck.getAdminInitializeRes, res)

      dispatch(actionsUsersList.loadUsersList(res.users));
      return res;
    })
    .then(res => {
      dispatch(loadSkills(res.skills));
      return res;
    })
    .then(res => {
      dispatch(flattenLocations())
      return dispatch(loadCauses(res.causes));
    })
    .catch(error => {
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
      return dispatch(actionsDisplay.toggleModal(error));
    })
}