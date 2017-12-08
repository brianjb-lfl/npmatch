import { reducer } from '../reducers/users';
import * as actions from '../actions/users';
import * as defaultState from '../reducers/potentialStates';

describe('reducer', () => {
  const initialState = defaultState.potentialStates.user;

  it('Should set the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state.user).toEqual(initialState.user);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state.user).toBe(initialState.user);
  });

  it('Should load a user into state', () => {
    const expectedResult = {
      id: 3,
      firstName: 'Jim',
      lastName: 'Smith',
      username: 'jimmys',
      userType: 'individual',
      organization: null,
      locationCity: 'Des Moynes',
      locationState: 'IL',
      locationCountry: 'USA',
      bio: 'Sausage-maker',
      links: undefined,
      causes: ['sausage-making', 'sausage-eating'],
      skills: ['carpentry'],
      responses: undefined,
      adminOf: undefined,
      following: undefined,
    }
    const action = Object.assign({}, {type: actions.LOAD_USER}, expectedResult);
    const state = reducer(initialState, action);
    // console.log('state returned', state);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
