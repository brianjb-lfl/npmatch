import { combineReducers } from 'redux';
import { reducer as user } from './user'
import { reducer as usersList } from './usersList'
import { reducer as opportunity } from './opportunity'
import { reducer as opportunitiesList } from './opportunitiesList'
import { reducer as form } from 'redux-form';


export default combineReducers({
  user,
  usersList,
  opportunity,
  opportunitiesList,
  form
});