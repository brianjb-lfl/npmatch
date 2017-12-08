import { reducer } from '../reducers/opportunitiesList';
import * as actions from '../actions/opportunitiesList';
import { opportunitiesList as initialState } from '../reducers/potentialStates';

describe('reducer', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load an array of opportunities into state', () => {
        
  });

});
