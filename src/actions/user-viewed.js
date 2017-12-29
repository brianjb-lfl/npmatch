// this is all detail for 1 user (individual OR organization); we should only need one at a time;
// this would be used when creating, editing, or viewing a profile
export const LOAD_USER_VIEWED = 'LOAD_USER_VIEWED';
export const loadUserViewed = user => ({
  type: LOAD_USER_VIEWED,
  id: user.id,
  username: user.username,
  userType: user.userType,
  firstName: user.firstName,
  lastName: user.lastName,
  organization: user.organization,
  logo: user.logo,
  locationCity: user.locationCity,
  locationState: user.locationState,
  locationCountry: user.locationCountry,
  availability: user.availability,
  bio: user.bio,
  authToken: user.authToken,
  links: user.links, // array of objects
  causes: user.causes,
  skills: user.skills,
  adminOf: user.adminOf, // array of objects
  admins: user.admins,
  following: user.following, // array of objects
  opportunities: user.opportunities,
  responses: user.responses,
});

// @@@@@@@@@@@@@@@ ASYNC @@@@@@@@@@@@@@@@@

