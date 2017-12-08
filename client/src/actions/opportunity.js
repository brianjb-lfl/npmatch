import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

export const LOAD_OPPORTUNITY = 'LOAD_OPPORTUNITY';
export const loadOpportunity = action => ({
  type: LOAD_OPPORTUNITY,
  id: action.id,
  userId: action.userId,
  organization: action.organization,
  opportunityType: action.opportunityType,
  offer: action.offer,
  title: action.title,
  narrative: action.narrative, // do we need this?
  timestampStart: action.timestampStart,
  timestampEnd: action.timestampEnd,
  locationCity: action.locationCity,
  locationState: action.locationState,
  locationCountry: action.locationCountry,
  link: action.link, // array of objects
  causes: action.causes,
  responses: action.responses,
});
