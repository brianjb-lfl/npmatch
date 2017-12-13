import * as actionsUserViewed from '../actions/user-viewed';
import * as actionsDisplay from '../actions/display';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - user viewed', () => {

  it('should create an action to load a minimal user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones'
    };
    const expectedAction = {
      type: actionsUserViewed.LOAD_USER_VIEWED,
      id: undefined,
      firstName: 'Bob',
      lastName: 'Jones',
      username:   undefined,
      userType:    undefined,
      organization: undefined,
      locationCity:  undefined,
      locationState:  undefined,
      locationCountry: undefined,
      bio:  undefined,
      links: undefined,
      causes: undefined,
      skills:  undefined,
      responses: undefined,
      adminOf:  undefined,
      following: undefined,
    }
    expect(actionsUserViewed.loadUserViewed(user)).toEqual(expectedAction)
  });

  it('should create an action to load a simple user', () => {
    const user = {
      id: 7,
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [],
      causes: [],
      skills: [],
      responses: [],
      adminOf: [],
      following: [],
    };
    const expectedAction = {
      type: actionsUserViewed.LOAD_USER_VIEWED,
      id: 7,
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [],
      causes: [],
      skills: [],
      responses: [],
      adminOf: [],
      following: [],
    }
    expect(actionsUserViewed.loadUserViewed(user)).toEqual(expectedAction)
  });

  it('should create an action to load a user with nested arrays', () => {
    const user = {
      id: 8,
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['children', 'elderly'],
      skills: ['listening', 'tutoring'],
      responses: [
        {
          id: '',
          id_opp: '',
          response_status: '',
          title: '',
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
      ],
    };
    const expectedAction = {
      type: actionsUserViewed.LOAD_USER_VIEWED,
      id: 8,
      id: 8,
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['children', 'elderly'],
      skills: ['listening', 'tutoring'],
      responses: [
        {
          id: '',
          id_opp: '',
          response_status: '',
          title: '',
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
      ],
    }
    expect(actionsUserViewed.loadUserViewed(user)).toEqual(expectedAction)
  });

})