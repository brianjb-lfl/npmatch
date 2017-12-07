import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

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
  bio: user.bio, // do we need this?
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  adminOf: user.adminOf, // array of objects
  following: user.following, // array of objects
});

export const LOAD_USER_LIST = 'LOAD_USER_LIST';
export const loadUserList = (array) => ({
  type: LOAD_USER_LIST,
  userList: array
});

export const LOAD_OPPORTUNITY = 'LOAD_OPPORTUNITY';
export const loadOpportunity = opp => ({
  type: LOAD_OPPORTUNITY,
  id: opp.id,
  userId: opp.userId,
  organization: opp.organization,
  opportunityType: opp.opportunityType,
  offer: opp.offer,
  title: opp.title,
  narrative: opp.narrative,
  timestampStart: opp.timestampStart,
  timestampEnd: opp.timestampEnd,
  locationCity: opp.locationCity,
  locationState: opp.locationState,
  locationCountry: opp.locationCountry,
  link: opp.link,
  causes: opp.causes,
});

export const LOAD_OPPORTUNITY_LIST = 'LOAD_OPPORTUNITY_LIST';
export const loadOpportunityList = (array) => ({
  type: LOAD_OPPORTUNITY_LIST,
  opportunityList: array
})
