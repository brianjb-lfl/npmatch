import * as actionsOpp from '../actions/opportunity';
import * as actionsDisplay from '../actions/display';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - single opportunity', () => {

  it('should create a single opportunity action', () => {
    const opportunity = {
      id: 1,
      userId: 2,
      organization: 'ABC Group',
      opportunityType: 'services',
      offer: false,
      title: 'Take a Senior Shopping!',
      narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
      timestampStart: '2018-02-13 12:51:00',
      timestampEnd: 'infinity',
      locationCity: 'The Plains',
      locationState: 'VA',
      locationCountry: 'USA',
      link: 'http://shop-dont-drop.org',
      causes: ['elderly', 'community'],  
      responses: [],
    };
    const expectedAction = {...opportunity, type: actionsOpp.LOAD_OPPORTUNITY};
    const result = actionsOpp.loadOpportunity(opportunity);
    expect(result).toEqual(expectedAction);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(result.id).toEqual(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    
  });

  it('should call action to fetch opportunity from server', () => {
    
    const oppId = 5; // doesn't matter for testing
    const expectedResponse = {id: oppId}; // this will be the response of the mock call
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
              
    return store.dispatch(actionsOpp.fetchOpp(oppId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(2);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, id: oppId }
        );
      })
  });

  it('should fail to call action to fetch opportunity from server', () => {
    
    const oppId = 5; // doesn't matter for testing
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
      Promise.reject(mockResponse(500, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.fetchOpp(oppId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(4); // 2 as of last test, plus 2 this time
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error }
        );
      })
  });

  it('should call action to send opportunity to server', () => {
    
    const opp = {title:'someOpp'}; // doesn't matter for testing
    const oppId = 88; // doesn't matter for testing
    const expectedResponse = {id: oppId}; // this will be the response of the mock call
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
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(6); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, id: oppId }
        );
      })
  });

  it('should fail to call action to send opportunity to server', () => {
    
    const opp = {title:'someOpp'}; // doesn't matter for testing
    const oppId = 88; // doesn't matter for testing
    const expectedResponse = {id: oppId}; // this will be the response of the mock call
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
      Promise.resolve(mockResponse(200, 'bad fetch', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(8); // 6 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: 'bad fetch' }
        );
      })
  });

})