import * as actionsUser from '../actions/user';
import * as actionsDisplay from '../actions/display';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - single user', () => {

  it('should create an action to load a minimal user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones'
    };
    const expectedAction = {
      type: actionsUser.LOAD_USER,
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
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
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
      type: 'LOAD_USER',
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
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
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
      type: actionsUser.LOAD_USER,
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
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
  });

  it('should call actions to fetch individual user from server', () => {
    
    const userId = 5; // doesn't matter for testing
    const type = 'users' // other option is 'orgs'
    const stateLocation = 'user' // other option is 'orgs'
    const expectedResponse = {id: userId}; // this will be the response of the mock call
    const authToken = '';

    const mockResponse = (status, statusText, response) => {
      return new window.Response(response, {
        status: status,
        statusText: statusText,
        headers: {
          'Content-type': 'application/json'
        }
      });
    };
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken, type, stateLocation))
      .then(() => {
        const expectedActions = store.getActions();
        console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(3);
        expect.assertions(2);  // number of callback functions
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, id: userId }
        );
      })
  });

})