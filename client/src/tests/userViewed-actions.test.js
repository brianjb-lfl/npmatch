import * as actions from '../actions/userViewed';

describe('actions - user viewed', () => {

  it('should create an action to load a minimal user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones'
    };
    const expectedAction = {
      type: actions.LOAD_USER,
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
    expect(actions.loadUser(user)).toEqual(expectedAction)
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
    expect(actions.loadUser(user)).toEqual(expectedAction)
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
      type: actions.LOAD_USER,
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
    expect(actions.loadUser(user)).toEqual(expectedAction)
  });

})