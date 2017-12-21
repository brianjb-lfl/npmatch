import * as actionsUser from '../actions/user-viewed';
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
      adminOf: {},
      admins: [],
      following: {},
      opportunities: {},
      responses: {},
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
      responses: {
        8: {
          id: 8,
          id_opp: '',
          response_status: '',
          title: '',
        }
      },
      adminOf: {
        1: {
          organization: 'SOME',
          id: 1,
        }
      },
      admins: [
        {
          firstName: 'adminFirst',
          lastName: 'adminLast',  
          id: '44',
        }
      ],
      following: {
        2: {
          organization: 'Bookmobile',
          id: 2,
        }
      },
      opportunities: {
        355: {
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
      },
      responses: {
        67: {
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
      },
    };
    const expectedAction = {...user, type: actionsUser.LOAD_USER}
    expect(actionsUser.loadUser(user)).toEqual(expectedAction)
  });

})