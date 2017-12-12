import { reducer } from '../reducers/general';
import * as actions from '../actions/general';
import { general as initialState } from '../reducers/potentialStates';

describe('reducer - display', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load the list of causes into state', () => {
    const causes = [];
    const state = reducer(initialState, {type: actions.LOAD_CAUSES, causes: causes});
    expect(state.causes).toBe(causes);
  });

  it('Should load the list of skills into state', () => {
    const skills = [];
    const state = reducer(initialState, {type: actions.LOAD_SKILLS, skills: skills});
    expect(state.skills).toBe(skills);
  });

});
