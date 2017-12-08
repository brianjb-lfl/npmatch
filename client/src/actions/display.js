// actions for changing display
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const changeDisplay = (view) => ({
  type: CHANGE_DISPLAY,
  view: view
});