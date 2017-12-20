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
  let cumulativeActions = 0;

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

  it('should create action to load single opportunity', () => {
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

  it('should create an action to load response to opportunity', () => {
    const newResponse = {
      id: 54,
      idOpportunity: 88,
      organization: 'Healthcare For The Homeless',
      userId: 72,
      firstName: 'Janet',
      lastName: 'Smythe',
      responseStatus: 'accepted',
      timestamp_status_change: '2018-09-28 11:45:15',
      timestamp_created: '2018-09-27 03:15:22',
    }
    const expectedAction = {response: newResponse, type: actionsOpp.LOAD_RESPONSE};
    const result = actionsOpp.loadResponse(newResponse);
    expect(result).toEqual(expectedAction);
  });

  /*
    fetch opp options
    success
    failure
  */
  it('should call action to fetch opportunity from server', () => {
    cumulativeActions += 2;

    const oppId = 5; // doesn't matter for testing
    const expectedResponse = {id: oppId}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.fetchOpp(oppId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, id: oppId }
        );
      })
  });

  it('should fail to call action to fetch opportunity from server', () => {
    cumulativeActions += 2;
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.fetchOpp(oppId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 2 as of last test, plus 2 this time
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error }
        );
      })
  });

    /*
    isNew = true
    isNew = false
    actionsOpportunity.createOpportunity options
    typeof opportunity.offer === string
      true: opportunity.offer.substring(0,5) === 'offer' 
      false
    typeof opportunity.locationState === string
    typeof opportunity.locationCountry === string
    failure
  */
  it('should send new offer opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {
      id: 333445566,
      userId: 22334,      
      organization: 'a', 
      opportunityType: 'b',
      offer: 'offer for...',
      title: 'ccc',
      narrative: 'ddd',
      timestampStart: 'eee',
      timestampEnd: 'fff',
      locationCity: 'ggg',
      locationState: 'hhh',
      locationCountry: 'iii',
      link: 'www',
      causes: ['uuu'],   
    }
    const expectedResponse = {...opp, offer: true};
    const isNew = true;
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, expectedResponse }
        );
      })
  });

  it('should send new non-offer opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {
      id: 33344225566,
      userId: 22334,      
      organization: 'a', 
      opportunityType: 'b',
      offer: 'notAnOffer',
      title: 'ccc',
      narrative: 'ddd',
      timestampStart: 'eee',
      timestampEnd: 'fff',
      locationCity: 'ggg',
      locationState: 'hhh',
      locationCountry: 'iii',
      link: 'www',
      causes: ['uuu'],   
    }
    const expectedResponse = {...opp, offer: false};
    const isNew = true;
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, expectedResponse }
        );
      })
  });

  it('should send new non-offer (with {}) opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {
      id: 33344588566,
      userId: 22334,      
      organization: 'a', 
      opportunityType: 'b',
      offer: {notAString: 'notAnOffer'},
      title: 'ccc',
      narrative: 'ddd',
      timestampStart: 'eee',
      timestampEnd: 'fff',
      locationCity: 'ggg',
      locationState: {abbreviation: 'MI'},
      locationCountry: {code: 'US'},
      link: 'www',
      causes: ['uuu'],   
    }
    const expectedResponse = {...opp, 
      offer: false, 
      locationState: 'MI', 
      locationCountry: 'US'
    };
    const isNew = true;
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, expectedResponse }
        );
      })
  });

  it('should edit a non-offer (with {}) opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {
      id: 33344556446,
      userId: 22334,      
      organization: 'a', 
      opportunityType: 'b',
      offer: {notAString: 'notAnOffer'},
      title: 'ccc',
      narrative: 'ddd',
      timestampStart: 'eee',
      timestampEnd: 'fff',
      locationCity: 'ggg',
      locationState: {wontWork: 'MI'},
      locationCountry: {stillWont: 'US'},
      link: 'www',
      causes: ['uuu'],   
      responses: [
        {
          id: 234,
          idOpportunity: 456,
          organization: 'a',
          userId: 9874,
          firstName: 'b', 
          lastName: 'c', 
          responseStatus: 'offered',
          title: 'x',
          timestampStatusChange: 'hh',
          timestampCreated: 'ss',
          notes: 'note',
        }
      ]
    }
    const expectedResponse = {...opp,
      offer: false,
      locationState: undefined,
      locationCountry: undefined
    };
    const isNew = false;
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, expectedResponse }
        );
      })
  });

  it('should edit a non-offer (with {}) opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {
      id: 33344556446,
      userId: 22334,      
      organization: 'a', 
      opportunityType: 'b',
      offer: {notAString: 'notAnOffer'},
      title: 'ccc',
      narrative: 'ddd',
      timestampStart: 'eee',
      timestampEnd: 'fff',
      locationCity: 'ggg',
      locationState: {wontWork: 'MI'},
      locationCountry: {stillWont: 'US'},
      link: 'www',
      causes: ['uuu'],   
      responses: 'just a string, should not work'
    }
    const expectedResponse = {...opp,
      offer: false,
      locationState: undefined,
      locationCountry: undefined
    };
    const isNew = false;
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 4 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOpp.LOAD_OPPORTUNITY, expectedResponse }
        );
      })
  });

  it('should fail to call action to send opportunity to server', () => {
    cumulativeActions += 2;

    const opp = {title:'someOpp'}; // doesn't matter for testing
    const oppId = 88; // doesn't matter for testing
    const expectedResponse = {error: 'error'}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, 'bad fetch', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOpp.createOpportunity(opp, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        expect(expectedActions.length).toBe(cumulativeActions); // 6 as of prior test, 2 from this test
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error }
        );
      })
  });

})