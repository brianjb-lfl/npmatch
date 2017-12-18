import { reducer } from '../reducers/opportunity';
import * as actions from '../actions/opportunity';
import { opportunity as initialState } from '../reducers/potential-states';

describe('reducer - single opportunity', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load a single opportunity into state', () => {
    const expectedResult = {
      id: 88,
      userId: 33,
      organization: 'Healthcare For The Homeless',     // SQL join (in case of individuals, list individual's full name here)
      opportunityType: 'services',
      offer: true,
      title: 'Flu Shots!',
      narrative: 'Get your flu shots!',
      timestampStart: '2018-10-01 08:00:00',
      timestampEnd: '2018-10-31 16:00:00',
      locationCity: 'Baltimore',
      locationState: 'MD',
      locationCountry: 'USA',
      link: '',
      causes: ['health', 'homelessness'],        // SQL join
      responses: [         // single only, not in list
          {
            id: 54,
            idOpportunity: 88,
            organization: 'Healthcare For The Homeless',// SQL join
            userId: 72,
            firstName: 'Janet',   // SQL join
            lastName: 'Smythe',    // SQL join
            responseStatus: 'accepted',
            timestamp_status_change: '2018-09-28 11:45:15',
            timestamp_created: '2018-09-27 03:15:22',
          }
        ],
    }
    const action = Object.assign({}, {type: actions.LOAD_OPPORTUNITY}, expectedResult);
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
