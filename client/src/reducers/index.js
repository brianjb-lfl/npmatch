import { combineReducers } from 'redux';
import { reducer as user } from './user'
import { reducer as userViewed } from './userViewed'
import { reducer as usersList } from './usersList'
import { reducer as opportunity } from './opportunity'
import { reducer as opportunitiesList } from './opportunitiesList'
import { reducer as display } from './display'
import { reducer as general } from './general'
import { reducer as form } from 'redux-form';

console.log('user in index', user);

export default combineReducers({
  user,
  userViewed,
  usersList,
  opportunity,
  opportunitiesList,
  display,
  general,
  form
});

module.exports = {user, userViewed, usersList, opportunity, opportunitiesList, display, general, form}