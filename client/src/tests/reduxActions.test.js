import * as actions from '../actions/reduxActions';

describe('actions', () => {
  it('should create an action that loads a simple user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones'
    };
    const expectedAction = {
      type: 'LOAD_USER',
      id: undefined,
      firstName: 'Bob',
      lastName: 'Jones',
      username:   undefined,
      userType:    undefined,
      organization: undefined,
      locationCity:  undefined,
      locationState:  undefined,
      locationCountry: undefined,
      bio:  undefined,
      links: undefined,
      causes: undefined,
      skills:  undefined,
      adminOf:  undefined,
      following: undefined,
    }
    expect(actions.loadUser(user)).toEqual(expectedAction)
  });

  it('should create an action that loads a complex user', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [],
      causes: [],
      skills: [],
      adminOf: [],
      following: [],
    };
    const expectedAction = {
      type: 'LOAD_USER',
      id: undefined,
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [],
      causes: [],
      skills: [],
      adminOf: [],
      following: [],
    }
    expect(actions.loadUser(user)).toEqual(expectedAction)
  });

  it('should create an action that loads a user with nested arrays', () => {
    const user = {
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['children', 'elderly'],
      skills: ['listening', 'tutoring'],
      adminOf: [
        {
          organization: 'SOME',
          id: 1,
        }
      ],
      following: [
        {
          organization: 'Bookmobile',
          id: 2,
        }
      ],
    };
    const expectedAction = {
      type: 'LOAD_USER',
      firstName: 'Bob',
      lastName: 'Jones',
      username: 'bobjones',
      userType: 'individual',
      organization: undefined,
      locationCity: 'Morgan City',
      locationState: 'LA',
      locationCountry: 'USA',
      bio: 'just a simple man',
      links: [
        {
          linkType: 'home',
          linkURL: 'http://about.me/bobjones',
        }
      ],
      causes: ['children', 'elderly'],
      skills: ['listening', 'tutoring'],
      adminOf: [
        {
          organization: 'SOME',
          id: 1,
        }
      ],
      following: [
        {
          organization: 'Bookmobile',
          id: 2,
        }
      ],
    }
    expect(actions.loadUser(user)).toEqual(expectedAction)
  });

  it('should load an array of users', () => {
    const arrayOfUsers = [
      {
        id: 1,
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
        opportunities: [
          {
            id: 2,
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
      type: 'LOAD_USER_LIST',
      userList: [
        {
          id: 1,
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
          opportunities: [
            {
              id: 2,
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
      ]
    };
    const result = actions.loadUserList(arrayOfUsers);
    expect(result).toEqual(expectedAction)
    expect(result.userList.length).toBe(2)
    expect(result.userList[0].id).toBe(1)
  });
  it('should load a single opportunity', () => {
    const opportunity = {
      id: 1,
      userId: 2,
      opportunityType: 'services',
      offer: false,
      title: 'Take a Senior Shopping!',
      narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
      timestampStart: '2018-02-13 12:51:00',
      timestampEnd: 'infinity',
      locationCity: 'The Plains',
      locationState: 'VA',
      locationCountry: 'USA',
      link: 'http://shop-dont-drop.org',
      causes: ['elderly', 'community'],        
    };
    const expectedAction = {
      type: 'LOAD_OPPORTUNITY',
      id: 1,
      userId: 2,
      opportunityType: 'services',
      offer: false,
      title: 'Take a Senior Shopping!',
      narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
      timestampStart: '2018-02-13 12:51:00',
      timestampEnd: 'infinity',
      locationCity: 'The Plains',
      locationState: 'VA',
      locationCountry: 'USA',
      link: 'http://shop-dont-drop.org',
      causes: ['elderly', 'community'],  
    };
    const result = actions.loadOpportunity(opportunity);
    expect(result).toEqual(expectedAction);
    
  });
    
  it('should load an array of opportunities', () => {
    const arrayOfOpportunities = [
      {
        id: 1,
        userId: 2,
        opportunityType: 'services',
        offer: false,
        title: 'Take a Senior Shopping!',
        narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
        timestampStart: '2018-02-13 12:51:00',
        timestampEnd: 'infinity',
        locationCity: 'The Plains',
        locationState: 'VA',
        locationCountry: 'USA',
        link: undefined,
        causes: ['elderly', 'community'],          
      },
      {
        id: 2,
        userId: 7,
        opportunityType: 'goods',
        offer: false,
        title: 'Canned Vegetables Needed',
        narrative: 'Just kidding, send cash. Do you know how economically inefficient and what a logistical nightmare food donations are?',
        timestampStart: '2018-14-88 25:77:123',
        timestampEnd: 'infinity',
        locationCity: 'Alexandria',
        locationState: 'VA',
        locationCountry: 'USA',
        link: undefined,
        causes: ['hunger', 'homelessness'],          
      }
    ];
    const expectedAction = {
      type: 'LOAD_OPPORTUNITY_LIST',
      opportunityList: [
        {
          id: 1,
          userId: 2,
          opportunityType: 'services',
          offer: false,
          title: 'Take a Senior Shopping!',
          narrative: 'Whether fetching necessities or in need of some retail therapy, it can be hard for some elderly to get to the store. Can you provide a ride and some company?',
          timestampStart: '2018-02-13 12:51:00',
          timestampEnd: 'infinity',
          locationCity: 'The Plains',
          locationState: 'VA',
          locationCountry: 'USA',
          link: undefined,
          causes: ['elderly', 'community'],          
        },
        {
          id: 2,
          userId: 7,
          opportunityType: 'goods',
          offer: false,
          title: 'Canned Vegetables Needed',
          narrative: 'Just kidding, send cash. Do you know how economically inefficient and what a logistical nightmare food donations are?',
          timestampStart: '2018-14-88 25:77:123',
          timestampEnd: 'infinity',
          locationCity: 'Alexandria',
          locationState: 'VA',
          locationCountry: 'USA',
          link: undefined,
          causes: ['hunger', 'homelessness'],          
        }
      ]
    }
    const result = actions.loadOpportunityList(arrayOfOpportunities);
    expect(result).toEqual(expectedAction)
  });

})