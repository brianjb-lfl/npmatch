'use strict';

export const user = {
  id: '',
  firstName: '',
  lastName: '',
  username: '',
  userType: '', 
  organization: '',
  locationCity: '',
  locationState: '',
  locationCountry: '',
  bio: '', 
  links: [              // SQL join
    {
      linkType: '',
      linkURL: '',
    }
  ],
  causes: [''],
  skills: [''],
  responses: [          // SQL join, single only, not in list
    {
      id: '',
      id_opp: '',
      response_status: '',
      title: '',        // nested SQL join
    }
  ],
  adminOf: [            // SQL join, single only, not in list
    {
      organization: '', // nested SQL join
      id: '',
    }
  ],
  following: [          // SQL join, single only, not in list
    {
      organization: '', // nested SQL join
      id: '',
    }
  ]
};

export const usersList = {
  main: [
    {
      id: '',
      firstName: '',
      lastName: '',
      username: '',
      userType: '', 
      organization: '',
      locationCity: '',
      locationState: '',
      locationCountry: '',
      bio: '',
      links: [         // SQL join
        {
          linkType: '',
          linkURL: '',
        }
      ],
      causes: [''],    // SQL join
      skills: [''],    // SQL join
      opportunities: [ // SQL join
        {
          id: '',
          userId: '',          // not needed on nested list, but native data, so keep
          // organization: '', // not on nested list
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
          causes: [''], // nested SQL join        
        }
      ]
    }
  ]
};
  
export const opportunity = {
  id: '',
  userId: '',
  organization: '',     // SQL join (in case of individuals, list individual's full name here)
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
  causes: [''],        // SQL join
  responses: [         // single only, not in list
      {
        id: '',
        idOpportunity: '',
        organization: '',// SQL join
        idUser: '',
        firstName: '',   // SQL join
        lastName: '',    // SQL join
        responseStatus: '',
        timestamp_status_change: '',
        timestamp_created: '',
      }
    ],
};

export const opportunitiesList = [
  {
    id: '',
    userId: '',
    organization: '', // SQL join (in case of individuals, list individual's full name here)
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
    causes: [''],     // SQL join   
  }
];