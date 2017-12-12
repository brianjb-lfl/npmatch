import { combineReducers } from 'redux';
import { reducer as user } from './user'
import { reducer as userViewed } from './userViewed'
import { reducer as usersList } from './usersList'
import { reducer as opportunity } from './opportunity'
import { reducer as opportunitiesList } from './opportunitiesList'
import { reducer as display } from './display'
import { reducer as general } from './general'
import { reducer as form } from 'redux-form';

export const reducer = combineReducers({
  user,
  userViewed,
  usersList,
  opportunity,
  opportunitiesList,
  display,
  general,
  form
});

// for testing
module.exports = {reducer, user, userViewed, usersList, opportunity, opportunitiesList, display, general, form}