import * as actions from '../actions/display';

describe('actions - display', () => {

  it('should change the display in state', () => {
    const display = 'landing';
    const expectedDisplay = {
      type: actions.CHANGE_DISPLAY,
      view: display
    }
    const result = actions.changeDisplay(display);
    expect(result).toEqual(expectedDisplay)
  });

})