import * as actionsOppsList from '../actions/opportunities-list';
import * as actionsDisplay from '../actions/display';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - opportunities list', () => {

  let cumulativeActions = 0;
  const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };

  it('should create an action: array of opportunities', () => {
    const arrayOfOpportunities = [
      {
        id: 1,
        userId: 2,
        opportunityType: 'services',
        offer: false,
        title: 'Take a Senior Shopping!',
        narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
        timestampStart: '2018-02-13 12:51:00',
        timestampEnd: 'infinity',
        locationCity: 'The Plains',
        locationState: 'VA',
        locationCountry: 'USA',
        link: undefined,
        causes: ['elderly', 'community'],          
      },
      {
        id: 2,
        userId: 7,
        opportunityType: 'goods',
        offer: false,
        title: 'Canned Vegetables Needed',
        narrative: 'Just kidding, send cash. Do you know how economically inefficient and what a logistical nightmare food donations are?',
        timestampStart: '2018-14-88 25:77:123',
        timestampEnd: 'infinity',
        locationCity: 'Alexandria',
        locationState: 'VA',
        locationCountry: 'USA',
        link: undefined,
        causes: ['hunger', 'homelessness'],          
      }
    ];
    const expectedAction = {
      type: actionsOppsList.LOAD_OPPORTUNITIES_LIST,
      main: [
        {
          id: 1,
          userId: 2,
          opportunityType: 'services',
          offer: false,
          title: 'Take a Senior Shopping!',
          narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
          timestampStart: '2018-02-13 12:51:00',
          timestampEnd: 'infinity',
          locationCity: 'The Plains',
          locationState: 'VA',
          locationCountry: 'USA',
          link: undefined,
          causes: ['elderly', 'community'],          
        },
        {
          id: 2,
          userId: 7,
          opportunityType: 'goods',
          offer: false,
          title: 'Canned Vegetables Needed',
          narrative: 'Just kidding, send cash. Do you know how economically inefficient and what a logistical nightmare food donations are?',
          timestampStart: '2018-14-88 25:77:123',
          timestampEnd: 'infinity',
          locationCity: 'Alexandria',
          locationState: 'VA',
          locationCountry: 'USA',
          link: undefined,
          causes: ['hunger', 'homelessness'],          
        }
      ]
    }
    const result = actionsOppsList.loadOpportunitiesList(arrayOfOpportunities);
    expect(result).toEqual(expectedAction)
  });

  it('should fetch opportunities list from server', () => {
    cumulativeActions += 2;
    
    const expectedResponse = {}; // this will be the response of the mock call
    const searchCriteria = {}; // doesn't matter for testing
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOppsList.fetchOppsList(searchCriteria, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsOppsList.LOAD_OPPS_LIST, main: {} }
        );
      })
  });

  it('should fail to fetch opportunities list from server', () => {
    cumulativeActions += 2;
    
    const expectedResponse = {error: 'error  234234234'}; // this will be the response of the mock call
    const searchCriteria = {}; // doesn't matter for testing
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsOppsList.fetchOppsList(searchCriteria, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

})