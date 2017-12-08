import { combineReducers } from 'redux';
import { reducer as user } from './user'
import { reducer as userViewed } from './userViewed'
import { reducer as usersList } from './usersList'
import { reducer as opportunity } from './opportunity'
import { reducer as opportunitiesList } from './opportunitiesList'
import { reducer as form } from 'redux-form';


export default combineReducers({
  user,
  userViewed,
  usersList,
  opportunity,
  opportunitiesList,
  form
});