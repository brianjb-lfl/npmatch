import * as actions from '../actions/display';

describe('actions - display', () => {

  it('should create an action to change the display', () => {
    const display = 'landing';
    const expectedDisplay = {
      type: actions.CHANGE_DISPLAY,
      view: display
    }
    const result = actions.changeDisplay(display);
    expect(result).toEqual(expectedDisplay)
  });

  it('should create an action to toggle the modal', () => {
    const message = 'error';
    const expectedDisplay = {
      type: actions.TOGGLE_MODAL,
      modalMessage: message
    }
    const result = actions.toggleModal(message);
    expect(result).toEqual(expectedDisplay)
  });

  it('should create an action to toggle the opportunity in focus', () => {
    const opportunityId = 5543;
    const expectedDisplay = {
      type: actions.TOGGLE_OPPORTUNITY,
      opportunityId
    }
    const result = actions.toggleOpportunity(opportunityId);
    expect(result).toEqual(expectedDisplay)
  });

  it('should create an action to toggle the user in focus', () => {
    const userId = 8776688;
    const expectedDisplay = {
      type: actions.TOGGLE_USER,
      userId
    }
    const result = actions.toggleUser(userId);
    expect(result).toEqual(expectedDisplay)
  });

})