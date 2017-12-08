import * as actions from '../actions/display';

describe('actions', () => {

  it('should change the display in state', () => {
    const display = 'landing';
    const expectedDisplay = {
      type: actions.CHANGE_DISPLAY,
      view: display
    }
    const result = actions.loadDisplay(display);
    expect(result).toEqual(expectedDisplay)
  });

})