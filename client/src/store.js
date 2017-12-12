import { reducer } from './reducers';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

export const store = createStore (reducer, applyMiddleware(thunk));

// console.log('reducer',typeof reducer);
// console.log('createStore',typeof createStore);
// console.log('applyMiddleware',typeof applyMiddleware);
// console.log('thunk',typeof thunk);

// for testing
module.exports = {store, reducer, createStore, applyMiddleware, thunk};