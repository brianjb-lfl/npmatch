import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';
import  * as actionsDisplay from './display';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing a profile
export const LOAD_USER_VIEWED = 'LOAD_USER_VIEWED';
export const loadUserViewed = user => ({
  type: LOAD_USER_VIEWED,
  id: user.id,
  firstName: user.firstName,
  lastName: user.lastName,
  username: user.username,
  userType: user.userType,
  organization: user.organization,
  locationCity: user.locationCity,
  locationState: user.locationState,
  locationCountry: user.locationCountry,
  bio: user.bio,
  logo: user.logo,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  responses: user.responses, // array of objects
  adminOf: user.adminOf, // array of objects
  following: user.following, // array of objects
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

