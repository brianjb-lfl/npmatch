import * as actionsGeneral from '../actions/general';
import * as actionsUsersList from '../actions/usersList';
// import * as actionsUsersList from '../actions/usersList';
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [ thunk ];
const mockStore = configureStore(middlewares);
// console.log('mockStore1',mockStore());

// Initialize mockstore with empty state
const initialState = {}
const store = mockStore(initialState)

describe('actions - general', () => {

  it('should create an action to load the list of causes', () => {
    const causes = [];
    const expectedAction = {
      type: actionsGeneral.LOAD_CAUSES,
      causes: causes,
    }
    expect(actionsGeneral.loadCauses(causes)).toEqual(expectedAction)
  });

  it('should create an action to load the list of causes', () => {
    const skills = []
    const expectedAction = {
      type: actionsGeneral.LOAD_SKILLS,
      skills: skills,
    }
    expect(actionsGeneral.loadSkills(skills)).toEqual(expectedAction)
  });

  it('should call actions to fetch the lists of causes and skills from server', () => {
    
    const expectedResponse = { // this will be the response of the mock call
      causes: [],
      skills: []
    }; 

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
              
    return store.dispatch(actionsGeneral.fetchInitialize())
      .then(() => {
        const expectedActions = store.getActions();
        // console.log('expectedActions',expectedActions)
        expect(expectedActions.length).toBe(3);
        expect(expectedActions).toContainEqual(
          {type: actionsGeneral.LOAD_CAUSES, causes: []},
          {type: actionsGeneral.LOAD_SKILLS, skills: []},
          {type: actionsUsersList.LOAD_USERS_LIST, usersList: []},
        );
      })
  });

})