import { reducer } from '../reducers/display';
import * as actions from '../actions/display';
import { display as initialState } from '../reducers/potentialStates';

describe('reducer', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load adisplay into state', () => {
        
  });

});
