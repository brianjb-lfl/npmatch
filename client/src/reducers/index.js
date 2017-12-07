import { combineReducers } from 'redux';
import { reducer as users } from './users'
import { reducer as form } from 'redux-form';


export default combineReducers({
  users,
  form
});