// actions for changing display
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const changeDisplay = (view) => ({
  type: CHANGE_DISPLAY,
  view: view
});

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = (message) => ({
  type: TOGGLE_MODAL,
  modalMessage: message
});