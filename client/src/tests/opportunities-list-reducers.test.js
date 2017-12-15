import { reducer } from '../reducers/opportunities-list';
import * as actions from '../actions/opportunities-list';
import { opportunitiesList as initialState } from '../reducers/potential-states';

describe('reducer - opportunities list', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load an array of opportunities into state', () => {
    const arrayOfOpps = [
      {
        id: 1,
        userId: 2,
        organization: 'Ace Hardware', // SQL join (in case of individuals, list individual's full name here)
        opportunityType: 'services',
        offer: false,
        title: 'Hammer-a-Thon',
        narrative: 'Nail Things!',
        timestampStart: '2018-09-15 12:30:00',
        timestampEnd: '2018-09-15 17:30:00',
        locationCity: 'Takoma Park',
        locationState: 'MD',
        locationCountry: 'USA',
        link: 'http://acehardwaretakoma.com',
        causes: ['community'],     // SQL join   
      },
      {
        id: 3,
        userId: 5,
        organization: 'ACME Hardware', // SQL join (in case of individuals, list individual's full name here)
        opportunityType: 'services',
        offer: false,
        title: 'Re-roof-a-rama',
        narrative: 'We\'ll supply the materials, you supply the muscle. We\'re going to patch roofs for homeowners in need.',
        timestampStart: '2018-09-15 13:30:00',
        timestampEnd: '2018-09-15 17:45:00',
        locationCity: 'Tacoma',
        locationState: 'WA',
        locationCountry: 'USA',
        link: 'http://roofarama.com',
        causes: ['community'],     // SQL join   
      }
    ];
    const expectedResult = {
      main: arrayOfOpps
    };
    const action = Object.assign({}, {type: actions.LOAD_OPPORTUNITIES_LIST, main: arrayOfOpps});
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
