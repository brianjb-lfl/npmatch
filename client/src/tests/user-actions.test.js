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
      authToken: undefined,
      firstName: 'Bob',
      lastName: 'Jones',
      username:   undefined,
      userType:    undefined,
      organization: undefined,
      locationCity:  undefined,
      locationState:  undefined,
      locationCountry: undefined,
      availability: undefined,
      bio:  undefined,
      links: undefined,
      causes: undefined,
      skills:  undefined,
      responses: undefined,
      adminOf:  undefined,
      admins: undefined,
      following: undefined,
      opportunities: undefined,
      responses: undefined,
    }
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
  });

  it('should create an action to load a simple user', () => {
    const user = {
      id: 7,
      username: 'bobjones',
      userType: 'individual',
      firstName: 'Bob',
      lastName: 'Jones',
      organization: undefined,
      logo: 'http://mylogo.com',
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      availability: 'anytime',
      bio: 'just a simple man',
      authToken: 'XYZ123',
      links: [],
      causes: [],
      skills: [],
      responses: [],
      adminOf: [],
      admins: [],
      following: [],
      opportunities: [],
      responses: [],
    };
    const expectedAction = {...user, type: actionsUser.LOAD_USER}
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
  });

  it('should create an action to load a user with nested arrays', () => {
    const user = {
      id: 8,
      username: 'bobjones',
      userType: 'individual',
      firstName: 'Bob',
      lastName: 'Jones',
      organization: undefined,
      logo: 'http://mylogo.com',
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      availability: 'anytime',
      bio: 'just a simple man',
      authToken: 'XYZ123',
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
      admins: [
        {
          firstName: 'adminFirst',
          lastName: 'adminLast',  
          id: '44',
        }
      ],
      following: [
        {
          organization: 'Bookmobile',
          id: 2,
        }
      ],
      opportunities: [
        {
          id: 355,
          userId: '',
          organization: '', 
          opportunityType: '',
          offer: '',
          title: 'test opportunity',
          narrative: '',
          timestampStart: '',
          timestampEnd: '',
          locationCity: '',
          locationState: '',
          locationCountry: '',
          link: '',
          causes: [''], 
        }
      ],
      responses: [
        {
          id: 67,
          idOpportunity: '',
          organization: '',
          userId: '',
          firstName: 'Dan',
          lastName: 'Wriggle', 
          responseStatus: '',
          title: '',
          timestampStatusChange: '',
          timestampCreated: '',
          notes: '',
        }
      ],
    };
    const expectedAction = {...user, type: actionsUser.LOAD_USER}
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
  });

  it('should call actions to fetch individual user from server and load as user in state', () => {
    
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
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, id: userId }
        );
      })
  });

  it('should call actions to fetch individual user from server and load as user in state (argument default option)', () => {
    
    const userId = 8; // doesn't matter for testing
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
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(4); // 2 this time, 2 prior run
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, id: userId }
        );
      })
  });

  it('should call actions to fetch individual user from server and load as userViewed in state', () => {
    
    const userId = 6; // doesn't matter for testing
    const type = 'users' // other option is 'orgs'
    const stateLocation = 'userViewed' // other option is 'orgs'
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
        // console.log('expectedActions userViewed',expectedActions)
        expect(expectedActions.length).toBe(6); // 3 from before, 3 from this time
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'userProfile'},
          {type: actionsUser.LOAD_USER_VIEWED, id: userId }
        );
      })
  });

  it('should fail to call actions to fetch individual user from server and toggle modal', () => {
    
    const userId = 7; // doesn't matter for testing
    const type = 'users' // other option is 'orgs'
    const stateLocation = 'user' // other option is 'orgs'
    const expectedResponse = {error: 'error'}; // this will be the response of the mock call
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
      Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken, type, stateLocation))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions fail user',expectedActions)
        expect(expectedActions.length).toBe(8); // 3 from 1st, 3 from 2nd, 2 from now
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},          
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

})