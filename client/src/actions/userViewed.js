import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing a profile
export const LOAD_USER = 'LOAD_USER';
export const loadUser = user => ({
  type: LOAD_USER,
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
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  responses: user.responses, // array of objects
  adminOf: user.adminOf, // array of objects
  following: user.following, // array of objects
});