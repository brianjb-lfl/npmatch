import { reducer } from '../reducers/usersList';
import * as actions from '../actions/usersList';
import { usersList as initialState } from '../reducers/potentialStates';

describe('reducer', () => {
  
  it('Should return the initial state when nothing is passed in', () => {
    const state = reducer(undefined, {type: '__UNKNOWN'});
    expect(state).toEqual(initialState);
  });

  it('Should return the current state on an unknown action', () => {
    const state = reducer(initialState, {type: '__UNKNOWN'});
    expect(state).toBe(initialState);
  });

  it('Should load an array of users into state', () => {
    const arrayOfUsers = [
      {
        id: 1,
        firstName: '',
        lastName: '',
        username: '',
        userType: '', 
        organization: 'Coffee for the Future',
        locationCity: 'Birmingham',
        locationState: 'AL',
        locationCountry: 'USA',
        bio: 'We work to ensure the world never runs out of caffeine',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://pouranothercup.org',
          },
          {
            linkType: 'financial',
            linkURL: 'http://pouranothercup.org/donations',
          }
        ],
        causes: ['hunger'],   
        skills: [''],   
        opportunities: [
          {
            id: 2,
            userId: 1,
            opportunityType: 'services',
            offer: false,
            title: 'Buzz Me 2018',
            narrative: 'Annual event to do some highly caffeinated things!',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Boulder',
            locationState: 'CO',
            locationCountry: 'USA',
            link: 'http://www.buzzme.org/2018',
            causes: ['hunger', 'peace'],          
          },
          {
            id: 3,
            userId: 1,            
            opportunityType: 'financial',
            offer: false,
            title: 'Buzz Me 2018 Fund Drive',
            narrative: 'Raising money for coffee plant research',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Everywhere',
            locationState: undefined,
            locationCountry: undefined,
            link: 'http://www.buzzme.org/2018/funds',
            causes: ['hunger', 'research'],          
          }
        ]
      },
      {
        id: 1,
        firstName: '',
        lastName: '',
        username: '',
        userType: '', 
        organization: 'The Literary Project',
        locationCity: 'San Diego',
        locationState: 'CA',
        locationCountry: 'USA',
        bio: 'We help improve the literacy of individuals and communities',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://tlp-reads.org',
          }
        ],
        causes: ['education'],   
        skills: [''],   
        opportunities: []
      }
    ];
    const expectedResult = {
      main: arrayOfUsers
    };
    const action = Object.assign({}, {type: actions.LOAD_USERS_LIST, main: arrayOfUsers});
    const state = reducer(initialState, action);
    expect(JSON.stringify(state)).toBe(JSON.stringify(expectedResult));
  });

});
