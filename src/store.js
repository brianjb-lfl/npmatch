import { reducer } from './reducers';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore (
  reducer, 
  composeEnhancers(applyMiddleware(thunk))
);

// for testing
export {reducer, createStore, applyMiddleware, thunk, composeEnhancers};
