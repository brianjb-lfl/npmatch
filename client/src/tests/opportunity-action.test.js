import * as actions from '../actions/opportunity';

describe('actions - single opportunity', () => {

  it('should load a single opportunity', () => {
    const opportunity = {
      id: 1,
      userId: 2,
      organization: 'ABC Group',
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
      responses: [],
    };
    const expectedAction = {
      type: actions.LOAD_OPPORTUNITY,
      id: 1,
      userId: 2,
      organization: 'ABC Group',
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
      responses: [],
    };
    const result = actions.loadOpportunity(opportunity);
    expect(result).toEqual(expectedAction);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(result.id).toEqual(1);
    expect(result.id).toBeGreaterThanOrEqual(1);
    
  });

})