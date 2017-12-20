import * as actionsUser from '../actions/user';
import * as actionsDisplay from '../actions/display';
import * as actionsOpportunity from '../actions/opportunity';
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
  /* actionsUser.manageLinks options
    action is neither (default to add)
    action = edit
    action = delete
  */
  it('Should add a link', () => {
    const links = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'}];
    const link = {linkType: 'home', linkURL: 'www'};
    const expectedResult = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'},{linkType: 'home', linkURL: 'www'}];
    const index = 2;
    const action = 'add'
    expect(actionsUser.updateLinks(links, link, index, action)).toEqual(expectedResult);
  });

  it('Should add a link (default)', () => {
    const links = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'}];
    const link = {linkType: 'home', linkURL: 'www'};
    const expectedResult = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'},{linkType: 'home', linkURL: 'www'}];
    const index = 2;
    const action = undefined;
    expect(actionsUser.updateLinks(links, link, index, action)).toEqual(expectedResult);
  });

  it('Should edit a link', () => {
    const links = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'}];
    const link = {linkType: 'home', linkURL: 'www'};
    const expectedResult = [{linkType:'home', linkURL: 'aaa'},{edit: false, linkType: 'home', linkURL: 'www'}];
    const index = 1;
    const action = 'edit'
    expect(actionsUser.updateLinks(links, link, index, action)).toEqual(expectedResult);
  });

  it('Should delete a link', () => {
    const links = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'}];
    const link = {linkType: 'home', linkURL: 'www'};
    const expectedResult =[{linkType:'financial', linkURL: 'xxx'}];
    const index = 0;
    const action = 'delete'
    expect(actionsUser.updateLinks(links, link, index, action)).toEqual(expectedResult);
  });

});

describe('user action async functions', () => {

  const mockResponse = (status, statusText, response) => {
    return new window.Response(response, {
      status: status,
      statusText: statusText,
      headers: {
        'Content-type': 'application/json'
      }
    });
  };
  let cumulativeActions = 0;

  /* actionsUser.fetchUser options
    stateLocation = 'user'
    stateLocation = 'userViewed'
    stateLocation is default
    error is thrown
  */
  it('should fetch 1 user from server and load user in state', () => {
    
    cumulativeActions += 2;
    const userId = 6976897854655; // doesn't matter for testing
    const stateLocation = 'user' // other option is 'orgs'
    const expectedResponse = {id: userId}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken, stateLocation))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, expectedResponse }
        );
      })
  });

  it('should fetch 1 user from server and load user in state (argument default)', () => {
    cumulativeActions += 2;
    const userId = 77654433333338; // doesn't matter for testing
    const expectedResponse = {id: userId}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 2 this time, 2 prior run
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, expectedResponse }
        );
      })
  });

  it('should fetch 1 user from server and load as userViewed in state', () => {
    cumulativeActions += 2;
    const userId = 11222112236; // doesn't matter for testing
    const stateLocation = 'userViewed' // other option is 'orgs'
    const expectedResponse = {id: userId}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken, stateLocation))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions userViewed',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 3 from before, 3 from this time
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'userProfile'},
          {type: actionsUser.LOAD_USER_VIEWED, expectedResponse }
        );
      })
  });

  it('should fetch 1 user from server and toggle modal', () => {
    cumulativeActions += 2;
    const userId = 7343578689; // doesn't matter for testing
    const stateLocation = 'user' // other option is 'orgs'
    const expectedResponse = {error: 'error'}; // this will be the response of the mock call
    const authToken = '';
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.fetchUser(userId, authToken, stateLocation))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions fail user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 3 from 1st, 3 from 2nd, 2 from now
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},          
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

  /* actionsUser.login options
    success
    failure
  */
  it('should login 1 user and load user in state', () => {
    cumulativeActions += 2;
    const user = {username: 'username', password: 'password'};
    const userId = 888767656457;
    const expectedResponse = {id: userId}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.login(user))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},
          {type: actionsUser.LOAD_USER, expectedResponse }
        );
      })
  });

  it('should login 1 user and toggle modal', () => {
    cumulativeActions += 2;
    const user = {username: 'username', password: 'password'};
    const expectedResponse = {error: 'error 35645634534'}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.login(user))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions fail user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 3 from 1st, 3 from 2nd, 2 from now
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},          
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

  /* actionsUser.createOrEditUser options
    isNew = true
    isNew is undefined (defaults to true)
    isNew = false
    failure
  */
  it('should create 1 user, login, and load user in state', () => {
    cumulativeActions += 3;
    const user = {
      username: 'username', 
      password: 'password',
      password2: 'password2',
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const userId = 1234598767;
    const isNew = true;
    const authToken = undefined;

    const expectedResponse = {id: userId}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditUser(user, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at login
          {type: actionsUser.LOAD_USER, expectedResponse} // in login
        );
      })
  });

  it('should create 1 user, login, (default argument) and load user in state', () => {
    cumulativeActions += 3;
    const user = {
      username: 'username', 
      password: 'password',
      password2: 'password2',
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const userId = 7657745634;
    const isNew = true;
    const authToken = undefined;

    const expectedResponse = {id: userId}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditUser(user, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at login
          {type: actionsUser.LOAD_USER, expectedResponse } // in login
        );
      })
  });

  it('should edit 1 user and load user in state', () => {
    cumulativeActions += 2;
    const user = {
      username: 'username', 
      bio: 'bio',
      firstName: 'firstName',
      lastName: 'lastName',
    };
    const userId = 714324234;
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = {id: userId}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditUser(user, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsUser.LOAD_USER, expectedResponse } // in login
        );
      })
  });

  it('should try to create 1 user and toggle modal', () => {
    cumulativeActions += 2;
    const user = {username: 'username', password: 'password'};
    const expectedResponse = {error: 'error  234234234'}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));

      return store.dispatch(actionsUser.login(user))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions fail user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions); // 3 from 1st, 3 from 2nd, 2 from now
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'},          
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

  it('edit user\'s links, edit 1 user, and load user in state', () => {
    cumulativeActions += 2;
    const links = [{linkType:'home', linkURL: 'aaa'}, {linkType:'financial', linkURL: 'xxx'}];
    const link = {linkType: 'home', linkURL: 'www'};
    const user = {
      username: 'username', 
      password: 'password',
      password2: 'password2',
      firstName: 'firstName',
      lastName: 'lastName',
      links,
      authToken: '',
    };
    const userId = 763663543;
    const index = 1;
    const action = 'edit';

    const expectedResponse = {id: userId}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.manageLinks(user, link, index, action))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsUser.LOAD_USER, expectedResponse } // in login
        );
      })
  });

  /* actionsUser.createOrEditResponse options
    isNew = true
      responseStatus = offered
    isNew is undefined (defaults to true)
      responseStatus if left off
    isNew = false
      responseStatus = deleted
      responseStatus = accepted
      responseStatus = denied
    error is thrown
  */
  it('should create 1 user\'s response and load in state', () => {
    cumulativeActions += 2;
    const response = {
      id: 856756788679,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'offered',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const isNew = true;
    const authToken = 'XXX';

    const expectedResponse = response; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsUser.LOAD_RESPONSE, expectedResponse } // in login
        );
      })
  });

  it('should create 1 user\'s response and load in state', () => {
    cumulativeActions += 2;
    const response = {
      id: 863563546,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'offered',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const authToken = 'XXX';

    const expectedResponse = response; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsUser.LOAD_RESPONSE, expectedResponse } // in login
        );
      })
  });

  it('should edit(delete) 1 user\'s response and load in state', () => {
    cumulativeActions += 2;
    const response = {
      id: 8978,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'deleted',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = response; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsUser.LOAD_RESPONSE, expectedResponse } // in login
        );
      })
  });

  it('should edit(deny) 1 user\'s response and load in state', () => {
    cumulativeActions += 2;
    const response = {
      id: 8324,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'accepted',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = response; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_RESPONSE, expectedResponse } // in login
        );
      })
  });

  it('should edit(deny) 1 user\'s response and load in state', () => {
    cumulativeActions += 2;
    const response = {
      id: 88656,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'denied',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = response; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_RESPONSE, expectedResponse } // in login
        );
      })
  });

  it('should ERROR on user\'s response and toggle modal', () => {
    cumulativeActions += 2;
    const response = {
      id: 88656,
      idOpportunity: 9,
      organization: 'a',
      userId: 7,
      firstName: 'b', 
      lastName: 'c', 
      responseStatus: 'denied',
      title: '',
      timestampStatusChange: '',
      timestampCreated: '',
      notes: '',
    };
    const userId = 7;
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = {error: 'error  353245432536456'}; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
    Promise.reject(mockResponse(500, 'ERROR', JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrEditResponse(response, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsDisplay.TOGGLE_MODAL, message: expectedResponse.error},
        );
      })
  });

  /*
    actionsUser.createOrDeleteRole options
    isNew = true
      role.capabilities === admin
      role.capabilities !== admin
    isNew is undefined (defaults to true)
    isNew = false
      role.capabilities === admin
      role.capabilities !== admin
    error
  */

  it('add an admin role and load in state', () => {
    cumulativeActions += 2;
    const role = {
      id: 982423432,
      idUserAdding: 353454354,
      idUserReceiving: 98989832392839,
      organization: 'a',
      capabilities: 'admin',
    };
    const isNew = true;
    const authToken = 'XXX';

    const expectedResponse = role; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrDeleteRole(role, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_ADMIN, expectedResponse, isNew} // in login
        );
      })
  });

  it('add a following role and load in state', () => {
    cumulativeActions += 2;
    const role = {
      id: 98242366432,
      idUserAdding: 35345664354,
      idUserReceiving: 989898323888892839,
      organization: 'a',
      capabilities: 'following',
    };
    const isNew = true;
    const authToken = 'XXX';

    const expectedResponse = role; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrDeleteRole(role, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_FOLLOWING, expectedResponse, isNew} // in login
        );
      })
  });

  it('add a following role (default isNew) and load in state', () => {
    cumulativeActions += 2;
    const role = {
      id: 98242366432,
      idUserAdding: 35345664354,
      idUserReceiving: 989898323888892839,
      organization: 'a',
      capabilities: 'following',
    };
    const authToken = 'XXX';

    const expectedResponse = role; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrDeleteRole(role, authToken))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_FOLLOWING, expectedResponse, undefined} // in login
        );
      })
  });

  it('edit an admin role and load in state', () => {
    cumulativeActions += 2;
    const role = {
      id: 9824668432,
      idUserAdding: 359545434,
      idUserReceiving: 9892839,
      organization: 'a',
      capabilities: 'admin',
    };
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = role; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrDeleteRole(role, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_ADMIN, expectedResponse, isNew} // in login
        );
      })
  });

  it('edit a following role and load in state', () => {
    cumulativeActions += 2;
    const role = {
      id: 66432,
      idUserAdding: 3534535,
      idUserReceiving: 992839,
      organization: 'a',
      capabilities: 'following',
    };
    const isNew = false;
    const authToken = 'XXX';

    const expectedResponse = role; // this will be the response of the mock call
    
    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, null, JSON.stringify(expectedResponse))));
              
    return store.dispatch(actionsUser.createOrDeleteRole(role, authToken, isNew))
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions user',expectedActions)
        expect(expectedActions.length).toBe(cumulativeActions);
        expect(expectedActions).toContainEqual(
          {type: actionsDisplay.CHANGE_DISPLAY, view: 'loading'}, // at create
          {type: actionsOpportunity.LOAD_FOLLOWING, expectedResponse, isNew} // in login
        );
      })
  });

});