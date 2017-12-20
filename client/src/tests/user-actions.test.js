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

describe('plain actions - single user', () => {

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

  it('should create an action to load response to user', () => {
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
    const expectedAction = {response: newResponse, type: actionsUser.LOAD_RESPONSE};
    const result = actionsUser.loadResponse(newResponse);
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to load admin into state', () => {
    const newAdmin = {
      id: 54,
      firstName: 'Janet',
      lastName: 'Smythe',
    }
    const expectedAction = {admin: newAdmin, type: actionsUser.LOAD_ADMIN};
    const result = actionsUser.loadAdmin(newAdmin);
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to load following into state', () => {
    const newFollowing = {
      id: 54,
      organization: 'ACME',
    }
    const expectedAction = {following: newFollowing, type: actionsUser.LOAD_FOLLOWING};
    const result = actionsUser.loadFollowing(newFollowing);
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to set form type in state', () => {
    const expectedAction = {type: actionsUser.SET_FORM_TYPE, formType: 'testForm'};
    const result = actionsUser.setFormType('testForm');
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to toggle edit link from true to false', () => {
    const links = [      
      {
        edit: true,
        linkType: 'home',
        linkURL: 'www',
      },
      {
        linkType: 'contribution',
        linkURL: 'xxx',
      },
    ];
    const newLinks = [...links];
    newLinks[0].edit = false;
    const expectedAction = {type: actionsUser.TOGGLE_EDIT_LINK, links: newLinks};
    const result = actionsUser.toggleEditLink(0,false,links);
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to toggle edit link from false to true', () => {
    const links = [      
      {
        edit: false,
        linkType: 'home',
        linkURL: 'www',
      },
      {
        linkType: 'contribution',
        linkURL: 'xxx',
      },
    ];
    const newLinks = [...links];
    newLinks[0].edit = true;
    const expectedAction = {type: actionsUser.TOGGLE_EDIT_LINK, links: newLinks};
    const result = actionsUser.toggleEditLink(0,true,links);
    expect(result).toEqual(expectedAction);
  });

  it('Should create action to NOT toggle edit link in state', () => {
    const links = [      
      {
        edit: false,
        linkType: 'home',
        linkURL: 'www',
      },
      {
        linkType: 'contribution',
        linkURL: 'xxx',
      },
    ];
    const newLinks = [...links];
    newLinks[0].edit = false;
    const expectedAction = {type: actionsUser.TOGGLE_EDIT_LINK, links: newLinks};
    const result = actionsUser.toggleEditLink(0,false,links);
    expect(result).toEqual(expectedAction);
  });

});

describe('user action helper functions', () => {

  it('Should convert an array of objects to an array of strings', () => {
    const input = [{id:'a',key:'g'},{id:'b',key:'e'}];
    const expectedOutput = ['a','b'];
    const key = 'id';
    expect(actionsUser.stringArrayOfObjects(input,key)).toEqual(expectedOutput);
  });

  it('Should NOT convert a string to an array of strings', () => {
    const input = 'just a string';
    const key = 'id';
    expect(actionsUser.stringArrayOfObjects(input,key)).toEqual([]);
  });

  it('Should NOT convert undefined to an array of strings', () => {
    const input = undefined;
    const key = 'id';
    expect(actionsUser.stringArrayOfObjects(input,key)).toEqual([]);
  });

  it('Should NOT convert an object to an array of strings', () => {
    const input = {id:'a',key:'g'};
    const key = 'id';
    expect(actionsUser.stringArrayOfObjects(input,key)).toEqual([]);
  });

  it('Should convert an array of objects to an object of keys (default key)', () => {
    const input = [{id:'a',key:'g'},{id:'b',key:'e'}];
    const expectedOutput = {a:{id:'a',key:'g'},b:{id:'b',key:'e'}};
    expect(actionsUser.arrayToObject(input)).toEqual(expectedOutput);
  });

  it('Should convert an array of objects to an object of keys', () => {
    const input = [{x:'a',key:'g'},{x:'b',key:'e'}];
    const expectedOutput = {a:{x:'a',key:'g'},b:{x:'b',key:'e'}};
    const key = 'x';
    expect(actionsUser.arrayToObject(input,key)).toEqual(expectedOutput);
  });

  it('Should NOT convert a string to an object of keys', () => {
    const input = 'just a string';
    const key = 'id';
    expect(actionsUser.arrayToObject(input,key)).toEqual({});
  });

  it('Should NOT convert undefined to an object of keys', () => {
    const input = undefined;
    const key = 'id';
    expect(actionsUser.arrayToObject(input,key)).toEqual({});
  });

  it('Should NOT convert an object to an object of keys', () => {
    const input = {id:'a',key:'g'};
    const key = 'id';
    expect(actionsUser.arrayToObject(input,key)).toEqual({});
  });

  it('Should convert an array of objects to an object of keys', () => {
    const input = {a:{id:'a',key:'g'},b:{id:'b',key:'e'}};
    const expectedOutput = [{id:'a',key:'g'},{id:'b',key:'e'}];
    expect(actionsUser.objectToArray(input)).toEqual(expectedOutput);
  });

  it('Should NOT convert a string to an object of keys', () => {
    const input = 'just a string';
    expect(actionsUser.objectToArray(input)).toEqual([]);
  });

  it('Should NOT convert undefined to an object of keys', () => {
    const input = undefined;
    expect(actionsUser.objectToArray(input)).toEqual([]);
  });

  it('Should NOT convert an object to an object of keys', () => {
    const input = [{id:'a',key:'g'},{id:'b',key:'e'}];
    expect(actionsUser.objectToArray(input)).toEqual([]);
  });

});

describe('user action async precursor functions', () => {


  it('Should ', () => {

    manageLinks(user, link, index, action)

  });

});

describe('user action async functions', () => {

  it('should fetch 1 user from server and load user in state', () => {
    
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

  it('should fetch 1 user from server and load user in state (argument default)', () => {
    
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

  it('should fetch 1 user from server and loaas userViewed in state', () => {
    
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

  it('should fetch 1 user from server and toggle modal', () => {
    
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