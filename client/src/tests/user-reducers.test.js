import { reducer } from '../reducers/user';
import * as actionsUser from '../actions/user';
import {user as initialState} from '../reducers/potential-states';

describe('reducer - single user', () => {
  
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
      username: 'jimmys',
      userType: undefined,
      firstName: 'Jim',
      lastName: 'Smith',
      organization: null,
      locationCity: undefined,
      locationState: undefined,
      locationCountry: undefined,
      availability: 'tomorrow',
      bio: undefined,
      authToken: 'XXX333',
      links: undefined,
      causes: undefined,
      skills: undefined,
      adminOf: undefined,
      admins: undefined,
      following: undefined,
      opportunities: undefined,
      responses: undefined,
    }
    const action = {...expectedResult, type: actionsUser.LOAD_USER};
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

  it('Should load a simple user into state', () => {
    const expectedResult = {
      id: 3,
      username: 'jimmys',
      userType: 'individual',
      firstName: 'Jim',
      lastName: 'Smith',
      organization: null,
      logo: null,
      locationCity: 'Des Moynes',
      locationState: 'IL',
      locationCountry: 'USA',
      bio: 'Sausage-maker',
      authToken: '756XTJ',
      links: undefined,
      causes: [],
      skills: [],
      adminOf: undefined,
      admins: undefined,
      following: undefined,
      opportunities: {},
      responses: undefined,
    }
    const action = {...expectedResult, type: actionsUser.LOAD_USER};
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

  it('Should load a complex user into state', () => {
    const expectedResult = {
      id: 3,
      username: 'jimmys',
      userType: 'individual',
      firstName: 'Jim',
      lastName: 'Smith',
      organization: null,
      logo: 'www.logos-r-us.com',
      locationCity: 'Des Moynes',
      locationState: 'IL',
      locationCountry: 'USA',
      availability: 'whenever',
      bio: 'Sausage-maker',
      authToken: 'ABC876',
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['sausage-making', 'sausage-eating'],
      skills: ['carpentry'],
      adminOf: {
        1: {
          organization: 'SOME',
          id: 1,
        }
      },
      admins: [    
        {
          firstName: '', 
          lastName: '',
          id: '',
        }
      ],
      following: {
        2: {
          organization: 'Bookmobile',
          id: 2,
        }
      },
      opportunities: {  
        88: {
          id: 88,
          userId: '',
          organization: '',
          opportunityType: '',
          offer: '',
          title: '',
          narrative: 'testing this',
          timestampStart: '',
          timestampEnd: '',
          locationCity: '',
          locationState: '',
          locationCountry: '',
          link: '',
          causes: [''],
        }
      },
      responses: {   
        67: {
          id: 67,
          idOpportunity: '',
          organization: '', 
          userId: '',
          firstName: '', 
          lastName: 'last name in response', 
          responseStatus: '',
          title: '',
          timestampStatusChange: '',
          timestampCreated: '',
          notes: '',
        }
      }, 
    }
    const action = {...expectedResult, type: actionsUser.LOAD_USER};
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
