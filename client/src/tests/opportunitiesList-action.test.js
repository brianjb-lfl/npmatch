import * as actions from '../actions/opportunitiesList';

describe('actions', () => {

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
      type: actions.LOAD_OPPORTUNITIES_LIST,
      main: [
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
    const result = actions.loadOpportunitiesList(arrayOfOpportunities);
    expect(result).toEqual(expectedAction)
  });

})