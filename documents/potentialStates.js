'use strict';

const potentialStates = {
  user: {
    id: '',
    firstName: '',
    lastName: '',
    username: '',
    userType: '', 
    organization: '',
    locationCity: '',
    locationState: '',
    locationCountry: '',
    bio: '', // do we need this?
    links: [
      {
        linkType: '',
        linkURL: '',
      }
    ],
    causes: [''],
    skills: [''],
    responses: [
      {}
    ],
    adminOf: [
      {
        organization: '',
        id: '',
      }
    ],
    following: [
      {
        organization: '',
        id: '',
      }
    ]
  },
  featuredOrgs: [
    {
      id: '',
      organization: '',
      locationCity: '',
      locationState: '',
      locationCountry: '',
      bio: '',
      links: [
        {
          linkType: '',
          linkURL: '',
        }
      ],
      causes: [''],      
      opportunities: [
        {
          id: '',
          opportunityType: '',
          offer: '',
          title: '',
          narrative: '',
          timestampStart: '',
          timestampEnd: '',
          locationCity: '',
          locationState: '',
          locationCountry: '',
          link: '',
          causes: [''],          
        }
      ]
    }
  ]
};