import { reducer } from '../reducers/display';
import * as actions from '../actions/display';
import { display as initialState } from '../reducers/potentialStates';

describe('reducer - display', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load a display into state', () => {
    const newView = 'login';
    const state = reducer(initialState, {type: actions.CHANGE_DISPLAY, view: newView});
    expect(state.view).toBe(newView);
  });

  it('Should show or hide the modal', () => {
    const newView = 'login';
    const state = reducer(initialState, {type: actions.CHANGE_DISPLAY, view: newView});
    expect(state.view).toBe(newView);
  });

});
