// display is primarily handled via routers. Display in state is for helper properties, such as modal, editing or not, etc. NOT for primary navigation.
export const CHANGE_DISPLAY = 'CHANGE_DISPLAY';
export const changeDisplay = view => ({
  type: CHANGE_DISPLAY,
  view: view
});

export const TOGGLE_MODAL = 'TOGGLE_MODAL';
export const toggleModal = message => ({
  type: TOGGLE_MODAL,
  modalMessage: message
});

export const TOGGLE_OPPORTUNITY = 'TOGGLE_OPPORTUNITY';
export const toggleOpportunity = opportunityId => ({
  type: TOGGLE_OPPORTUNITY,
  opportunityId
});

export const TOGGLE_USER = 'TOGGLE_USER';
export const toggleUser = userId => ({
  type: TOGGLE_USER,
  userId
});

export const SET_FORM_STATUS = 'SET_FORM_STATUS';
export const setFormStatus = formStatus => ({
  type: SET_FORM_STATUS,
  formStatus
});

export const GET_DATE_TIME = 'GET_DATE-TIME';
export const getDateTime = dateTime => ({
  type: GET_DATE_TIME,
  dateTime
});
