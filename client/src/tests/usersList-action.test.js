import * as actions from '../actions/usersList';

describe('actions - list of users', () => {

  it('should load an array of users', () => {
    const arrayOfUsers = [
      {
        id: 1,
        firstName: '',
        lastName: '',
        username: '',
        userType: '',         
        organization: 'Coffee for the Future',
        locationCity: 'Birmingham',
        locationState: 'AL',
        locationCountry: 'USA',
        bio: 'We work to ensure the world never runs out of caffeine',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://pouranothercup.org',
          },
          {
            linkType: 'financial',
            linkURL: 'http://pouranothercup.org/donations',
          }
        ],
        causes: ['hunger'],    
        skills: [''],  
        opportunities: [
          {
            id: 2,
            userId: 1,
            opportunityType: 'services',
            offer: false,
            title: 'Buzz Me 2018',
            narrative: 'Annual event to do some highly caffeinated things!',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Boulder',
            locationState: 'CO',
            locationCountry: 'USA',
            link: 'http://www.buzzme.org/2018',
            causes: ['hunger', 'peace'],          
          },
          {
            id: 3,
            userId: 1,
            opportunityType: 'financial',
            offer: false,
            title: 'Buzz Me 2018 Fund Drive',
            narrative: 'Raising money for coffee plant research',
            timestampStart: '2018-01-13 01:00:00',
            timestampEnd: '2018-01-23 01:00:00',
            locationCity: 'Everywhere',
            locationState: undefined,
            locationCountry: undefined,
            link: 'http://www.buzzme.org/2018/funds',
            causes: ['hunger', 'research'],          
          }
        ]
      },
      {
        id: 1,
        organization: 'The Literary Project',
        locationCity: 'San Diego',
        locationState: 'CA',
        locationCountry: 'USA',
        bio: 'We help improve the literacy of individuals and communities',
        links: [
          {
            linkType: 'home',
            linkURL: 'http://tlp-reads.org',
          }
        ],
        causes: ['education'],      
        opportunities: []
      }
    ];
    const expectedAction = {
      type: actions.LOAD_USERS_LIST,
      main: arrayOfUsers
    };
    const result = actions.loadUsersList(arrayOfUsers);
    expect(result).toEqual(expectedAction)
    expect(result.main.length).toBe(2)
    expect(result.main[0].id).toBe(1)
  });


})