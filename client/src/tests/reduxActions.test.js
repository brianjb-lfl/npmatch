import * as actions from './reduxActions';

describe('actions', () => {
  it('should create an action that loads a user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones'
    };
    const expectedAction = {
      type: 'LOAD_USER',
      firstName: 'Bob',
      lastName: 'Jones'
    }
    expect(actions.loadUser(user)).toEqual(expectedAction)
  })
})