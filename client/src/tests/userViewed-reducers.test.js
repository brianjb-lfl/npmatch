import { reducer } from '../reducers/userViewed';
import * as actions from '../actions/userViewed';
import {user as initialState} from '../reducers/potentialStates';

describe('reducer - user viewed', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load a minimal user into state', () => {
    const expectedResult = {
      id: 3,
      firstName: 'Jim',
      lastName: 'Smith',
      username: 'jimmys',
      userType: undefined,
      organization: null,
      locationCity: undefined,
      locationState: undefined,
      locationCountry: undefined,
      bio: undefined,
      links: undefined,
      causes: undefined,
      skills: undefined,
      responses: undefined,
      adminOf: undefined,
      following: undefined,
    }
    const action = Object.assign({}, {type: actions.LOAD_USER}, expectedResult);
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

  it('Should load a simple user into state', () => {
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
      causes: [],
      skills: [],
      responses: undefined,
      adminOf: undefined,
      following: undefined,
    }
    const action = Object.assign({}, {type: actions.LOAD_USER}, expectedResult);
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

  it('Should load a complex user into state', () => {
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
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['sausage-making', 'sausage-eating'],
      skills: ['carpentry'],
      responses: [
        {
          id: 3,
          id_opp: 4,
          response_status: 'pending',
        }
      ],
      adminOf: [
        {
          organization: 'SOME',
          id: 1,
        }
      ],
      following: [
        {
          organization: 'Bookmobile',
          id: 2,
        }
      ]
    }
    const action = Object.assign({}, {type: actions.LOAD_USER}, expectedResult);
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
