import * as actionsOppsList from '../actions/opportunitiesList';
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

  it('should call actions to fetch opportunities list from server', () => {
    
        const mockResponse = (status, statusText, response) => {
          return new window.Response(response, {
            status: status,
            statusText: statusText,
            headers: {
              'Content-type': 'application/json'
            }
          });
        };
    
        const expectedResponse = {}; // this will be the response of the mock call
        const searchCriteria = {}; // doesn't matter for testing
        const authToken = '';
    
        // cannot find docs on window.fetch. Does this intercept fetch in "this" window?
        // i.e. when actions.fetchUsersList is called, does this intercept, because it is in the same "window"? 
        window.fetch = jest.fn().mockImplementation(() =>
          Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
    
        // console.log('store',store);
          
        return store.dispatch(actionsOppsList.fetchOppsList(searchCriteria, authToken))
          .then(() => {
            const expectedActions = store.getActions();
            console.log('expectedActions',expectedActions)
            expect(expectedActions.length).toBe(3);
            expect.assertions(2);  // number of callback functions
            expect(expectedActions).toContainEqual(
              {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
              {type: actionsOppsList.LOAD_OPPS_LIST, main: {} }
            );
          })
      });

})