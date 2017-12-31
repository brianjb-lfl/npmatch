// display is primarily handled via routers. Display in state is for helper properties, such as modal, editing or not, etc. NOT for primary navigation.
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const changeDisplay = view => ({
  type: CHANGE_DISPLAY,
  view
});

export const CHANGE_DISPLAY_STATUS = 'CHANGE_DISPLAY_STATUS';
export const changeDisplayStatus = status => ({
  type: CHANGE_DISPLAY_STATUS,
  status
});

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = message => ({
  type: TOGGLE_MODAL,
  modalMessage: message
});

export const TOGGLE_OPPORTUNITY = 'TOGGLE_OPPORTUNITY';
export const toggleOpportunity = idOpportunity => ({
  type: TOGGLE_OPPORTUNITY,
  idOpportunity
});

export const TOGGLE_ROLE = 'TOGGLE_ROLE';
export const toggleRole = idRole => ({
  type: TOGGLE_ROLE,
  idRole
});

export const TOGGLE_USER = 'TOGGLE_USER';
export const toggleUser = userId => ({
  type: TOGGLE_USER,
  userId
});

export const SAVE_LATEST_RESPONSE = 'SAVE_LATEST_RESPONSE-TIME';
export const saveLatestResponse = id => ({
  type: SAVE_LATEST_RESPONSE,
  latestResponse: id
});

