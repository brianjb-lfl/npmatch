import 'whatwg-fetch';
import { REACT_APP_BASE_URL } from '../config'
import {SubmissionError} from 'redux-form';

export const LOAD_USERS_LIST = 'LOAD_USERS_LIST';
export const loadUsersList = (array) => ({
  type: LOAD_USERS_LIST,
  main: array
});