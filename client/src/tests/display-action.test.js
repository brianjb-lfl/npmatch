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

})