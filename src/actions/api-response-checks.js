export const compareObjects = (expected, received) => {
  // console.log('received at compare',received);
  let message = [];

  const compare = (expected, received) => {

    if (Array.isArray(expected)) {
      if (Array.isArray(received)) {
        received.forEach((item,index)=>{
          compare(expected[0], item, index);
        });
      } else {
        const typeReceived = typeof received;
        message.push(`expected array at ${expected} but received ${typeReceived}`);
      }
    } else if (typeof expected === 'object' && !Array.isArray(expected)) {
      if (typeof received === 'object' && !Array.isArray(received)) {
        for (let key in expected) {
          if (received.hasOwnProperty(key)) {
            compare(expected[key], received[key], key);
          } else {
            message.push( `expected key of ${key}`);
          }
        }
      } else {
        const typeReceived = typeof received;
        message.push(`expected array at ${expected[0]} but received ${typeReceived}`);
      }
    } else if (Array.isArray(received)) {
      message.push(`received an array ${received[0]} where expecting a primitive data type`);
    } else if (typeof received === 'object' && received !== null) {
      message.push(`received an object ${received} where expecting a primitive data type`);
  
    } else if (typeof expected === 'number' && typeof received === 'string') {
      message.push(`expected a number but received a string ${received}`);
    } else if (typeof expected === 'number' && typeof received === 'boolean') {
      message.push(`expected a number but received a boolean ${received}`);
      
    } else if (typeof expected === 'string' && typeof received === 'number') {
      message.push(`expected a string but received a number ${received}`);
    } else if (typeof expected === 'string' && typeof received === 'boolean') {
      message.push(`expected a string but received a boolean ${received}`);

    } else if (typeof expected === 'boolean' && typeof received === 'number') {
      message.push(`expected a boolean but received a number ${received}`);
    } else if (typeof expected === 'boolean' && typeof received === 'string') {
      message.push(`expected a boolean but received a string ${received}`);

    } else {
      return;
    }
  };
  compare(expected, received);

  if (message.length > 0) {
    console.log(message);
    console.log(message.length);
    console.log('');
    console.log('expected');
    console.log(expected);
    console.log('received');
    console.log(received);
    console.log('');
    return message;
  } 
  message = 'A-OK!' ;
  console.log(message);
  return message;

};

export const getAdminInitializeRes = {
  "skills": [
    "string"
  ],
  "causes": [
    "string"
  ],
  "users": [
    {
      "id": 0,
      "username": "string",
      "userType": "string",
      "firstName": "string",
      "lastName": "string",
      "organization": "string",
      "logo": "string",
      "locationCity": "string",
      "locationState": "string",
      "locationCountry": "string",
      "bio": "string",
      "links": [
        {
          "linkType": "string",
          "linkUrl": "string"
        }
      ],
      "causes": [
        "string"
      ],
      "skills": [
        "string"
      ]
    }
  ]
};

export const getUsersListRes = [
  {
    "id": 0,
    "username": "string",
    "userType": "string",
    "firstName": "string",
    "lastName": "string",
    "organization": "string",
    "logo": "string",
    "locationCity": "string",
    "locationState": "string",
    "locationCountry": "string",
    "availability": "string",
    "bio": "string",
    "links": [
      {
        "linkType": "string",
        "linkUrl": "string"
      }
    ],
    "causes": [
      "string"
    ],
    "skills": [
      "string"
    ]
  }
];

export const postAuthLogin = {
  "username": "string",
  "password": "string",
};

export const postUsers = {
  "username": "string",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string"
};

export const postUsersRes = {
  "id": 0,
  "username": "string",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
};

export const getUsersIdRes = {
  "id": 0,
  "username": "string",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
  "logo": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "availability": "string",
  "bio": "string",
  "links": [
    {
      "linkType": "string",
      "linkUrl": "string"
    }
  ],
  "causes": [
    "string"
  ],
  "skills": [
    "string"
  ],
  "adminOf": [
    {
      "id": 0,
      "organization": "string"
    }
  ],
  "admins": [
    {
      "id": 0,
      "firstName": "string",
      "lastName": "string"
    }
  ],
  "following": [
    {
      "id": 0,
      "organization": "string"
    }
  ],
  "opportunities": [
    {
      "id": 0,
      "userId": "string",
      "organization": "string",
      "opportunityType": "string",
      "offer": true,
      "title": "string",
      "narrative": "string",
      "timestampStart": "string",
      "timestampEnd": "string",
      "locationCity": "string",
      "locationState": "string",
      "locationCountry": "string",
      "link": "string",
      "causes": [
        "string"
      ]
    }
  ],
  "responses": [
    {
      "id": 0,
      "idOpportunity": 0,
      "userId": 0,
      "notes": "free-form text",
      "responseStatus": "offered || accepted || deleted || denied",
      "timestampStatusChange": "string",
      "timestampCreated": "string",
      "organization": "copy from state at creation",
      "firstName": "copy from state at creation",
      "lastName": "copy from state at creation",
      "title": "copy from state at creation"
    }
  ]
};

export const putUsersId = {
  "id": 0,
  "username": "string",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
  "logo": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "availability": "string",
  "bio": "string",
  "links": [
    {
      "linkType": "string",
      "linkUrl": "string"
    }
  ],
  "causes": [
    "string"
  ],
  "skills": [
    "string"
  ]
}

export const putUsersIdRes = {
  "id": 0,
  "username": "string",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
  "logo": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "availability": "string",
  "bio": "string",
  "links": [
    {
      "linkType": "string",
      "linkUrl": "string"
    }
  ],
  "causes": [
    "string"
  ],
  "skills": [
    "string"
  ]
}

export const getOpportunitiesListRes = [
  {
    "id": 0,
    "userId": 0,
    "organization": "string",
    "opportunityType": "string",
    "offer": true,
    "title": "string",
    "narrative": "string",
    "timestampStart": "string",
    "timestampEnd": "string",
    "locationCity": "string",
    "locationState": "string",
    "locationCountry": "string",
    "link": "string",
    "causes": [
      "string"
    ]
  }
];

export const postOpportunities = {
  "userId": 0,
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  "narrative": "string",
  "timestampStart": "string",
  "timestampEnd": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "link": "string",
  "causes": [
    "string"
  ]
};

export const postOpportunitiesRes = {
  "id": 0,
  "userId": "string",
  "organization": "string",
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  "narrative": "string",
  "timestampStart": "string",
  "timestampEnd": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "link": "string",
  "causes": [
    "string"
  ]
};

export const getOpportunitiesIdRes = {
  "id": 0,
  "userId": "string",
  "organization": "string",
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  "narrative": "string",
  "timestampStart": "string",
  "timestampEnd": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "link": "string",
  "causes": [
    "string"
  ],
  "responses": [
    {
      "id": 0,
      "idOpportunity": 0,
      "userId": 0,
      "notes": "free-form text",
      "responseStatus": "offered || accepted || deleted || denied",
      "timestampStatusChange": "string",
      "timestampCreated": "string",
      "organization": "SQL Join at response",
      "firstName": "SQL Join at response",
      "lastName": "SQL Join at response",
      "title": "SQL Join at response"
    }
  ]
};

export const putOpportunitiesId = {
  "id": 0,
  "userId": 0,
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  "logo": "string",
  "narrative": "string",
  "timestampStart": "string",
  "timestampEnd": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "link": "string",
  "causes": [
    "string"
  ]
};

export const putOpportunitiesIdRes = {
  "id": 0,
  "userId": 0,
  "opportunityType": "string",
  "organization": "string",
  "offer": true,
  "title": "string",
  "logo": "string",
  "narrative": "string",
  "timestampStart": "string",
  "timestampEnd": "string",
  "locationCity": "string",
  "locationState": "string",
  "locationCountry": "string",
  "link": "string",
  "causes": [
    "string"
  ],
  "skills": [
    "string"
  ]
};

export const postRoles = {
  "idUserAdding": 0,
  "idUserReceiving": 0,
  "capabilities": "admin or following"
};

export const postRolesRes = {
  "idUserAdding": 0,
  "idUserReceiving": 0,
  "organization": "SQL join at response",
  "capabilities": "string"
};

export const putRolesId = {
  "idUserAdding": 0,
  "idUserReceiving": 0,
  "capabilities": "admin or following"
};

export const putRolesIdRes = {
  "id": 0,
  "idUserAdding": 0,
  "idUserReceiving": 0,
  "organization": "SQL join at response",
  "capabilities": "string"
};

export const postResponses = {
  "idOpportunity": 0,
  "userId": 0,
  "notes": "free-form text"
};

export const postResponsesRes = {
  "id": 0,
  "idOpportunity": 0,
  "userId": 0,
  "notes": "free-form text",
  "responseStatus": "string",
  "timestampStatusChange": "string",
  "timestampCreated": "string",
  "organization": "SQL join at response",
  "firstName": "SQL join at responsen",
  "lastName": "SQL join at response",
  "title": "SQL join at response"
};

export const putResponsesId = {
  "id": 0,
  "idOpportunity": 0,
  "userId": 0,
  "notes": "free-form text",
  "responseStatus": "offered || accepted || deleted || denied"
};

export const putResponsesIdRes = {
  "id": 0,
  "idOpportunity": 0,
  "userId": 0,
  "notes": "free-form text",
  "responseStatus": "offered || accepted || deleted || denied",
  "timestampStatusChange": "string",
  "timestampCreated": "string",
  "organization": "SQL join at response",
  "firstName": "SQL join at response",
  "lastName": "SQL join at response",
  "title": "SQL join at response"
};
