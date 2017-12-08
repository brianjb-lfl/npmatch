import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

export const LOAD_OPPORTUNITIES_LIST = 'LOAD_OPPORTUNITIES_LIST';
export const loadOpportunitiesList = (array) => ({
  type: LOAD_OPPORTUNITIES_LIST,
  main: array
})
