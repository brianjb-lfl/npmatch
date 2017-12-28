export const compareObjects = (expected, received) => {
  // console.log('expected at compare',expected);
  // console.log('received at compare',received);
  let message = [];

  const compare = (expected, received, levelCounter) => {

    if (Array.isArray(expected)) {
      if (Array.isArray(received)) {
        received.forEach((item,index)=>{
          compare(expected[0], item, levelCounter + 1);
        });
      } else {
        const typeReceived = typeof received;
        if (!(message.includes(feedback))) { message.push( feedback )};
        let feedback = `expected array at ${expected} at level ${levelCounter} but received ${typeReceived}`;
      }
    } else if (typeof expected === 'object' && !Array.isArray(expected)) {
      if (typeof received === 'object' && !Array.isArray(received)) {
        for (let key in expected) {
          if (received.hasOwnProperty(key)) {
            compare(expected[key], received[key], levelCounter + 1);
          } else {
            let feedback = `expected key of ${key} at level ${levelCounter}`
            if (!(message.includes(feedback))) { message.push( feedback )};
          }
        }
      } else {
        const typeReceived = typeof received;
        let feedback = `expected object at ${expected[0]} at level ${levelCounter} but received ${typeReceived}`;
        if (!(message.includes(feedback))) { message.push( feedback )};
      }
    } else if (Array.isArray(received)) {
      let feedback = `received an array ${received[0]} at level ${levelCounter} where expecting a primitive data type`;
      if (!(message.includes(feedback))) { message.push( feedback )};
    } else if (typeof received === 'object' && received !== null) {
      let feedback = `received an object ${received} at level ${levelCounter} where expecting a primitive data type`;
      if (!(message.includes(feedback))) { message.push( feedback )};
  
    } else if (typeof expected === 'number' && typeof received === 'string') {
      let feedback = `expected a number at level ${levelCounter} but received a string ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};
    } else if (typeof expected === 'number' && typeof received === 'boolean') {
      let feedback = `expected a number at level ${levelCounter} but received a boolean ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};
      
    } else if (typeof expected === 'string' && typeof received === 'number') {
      let feedback = `expected a string at level ${levelCounter} but received a number ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};
    } else if (typeof expected === 'string' && typeof received === 'boolean') {
      let feedback = `expected a string at level ${levelCounter} but received a boolean ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};

    } else if (typeof expected === 'boolean' && typeof received === 'number') {
      let feedback = `expected a boolean at level ${levelCounter} but received a number ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};
    } else if (typeof expected === 'boolean' && typeof received === 'string') {
      let feedback = `expected a boolean at level ${levelCounter} but received a string ${received}`;
      if (!(message.includes(feedback))) { message.push( feedback )};

    } else {
      return;
    }
  };
  compare(expected, received, 1);

  if (message.length > 0) {
    console.log('***', message);
    console.log('***');
    console.log('*** expected');
    console.log('***', expected);
    console.log('*** received');
    console.log('***', received);
    console.log('************');
    return message;
  } 
  message = 'A-OK!' ;
  console.log(message);
  return message;

};

export const getAdminInitializeRes = {
  "skills": [
    "response"
  ],
  "causes": [
    "string"
  ],
  "users": [
    {
      "id": 1,
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
    "id": 1,
    "username": "response",
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
  "username": "request",
  "password": "string",
};

export const postUsers = {
  "username": "request",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string"
};

export const postUsersRes = {
  "id": 1,
  "username": "response",
  "userType": "string",
  "firstName": "string",
  "lastName": "string",
  "organization": "string",
};

export const getUsersIdRes = {
  "id": 1,
  "username": "response",
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
      "organization": "SQL join",
      "firstName": "SQL join",
      "lastName": "SQL join",
      "title": "SQL join"
    }
  ]
};

export const putUsersId = {
  "id": 0,
  "username": "request",
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
  "id": 1,
  "username": "response",
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
    "id": 1,
    "userId": 1,
    "organization": "response",
    "opportunityType": "string",
    "offer": true,
    "title": "string",
    // "logo": "http://mylogo.com",
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
  "opportunityType": "request",
  "offer": true,
  "title": "string",
  // "logo":"http://mylogo.com"
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
  "id": 1,
  "userId": 1,
  "organization": "response",
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  // "logo":"http://mylogo.com"
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
  "id": 1,
  "userId": 1,
  "organization": "response",
  "opportunityType": "string",
  "offer": true,
  "title": "string",
  // "logo":"http://mylogo.com"
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
  "opportunityType": "request",
  "offer": true,
  "title": "string",
  // "logo":"http://mylogo.com"
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
  "id": 1,
  "userId": 1,
  "opportunityType": "response",
  "organization": "string",
  "offer": true,
  "title": "string",
  // "logo": "string",
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
};

export const postRoles = {
  "idUserAdding": 0,
  "idUserReceiving": 0,
  "capabilities": "admin or following"
};

export const postRolesRes = {
  "idUserAdding": 1,
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
  "id": 1,
  "idUserAdding": 1,
  "idUserReceiving": 1,
  "organization": "SQL join at response",
  "capabilities": "string"
};

export const postResponses = {
  "idOpportunity": 0,
  "userId": 0,
  "notes": "request free-form text"
};

export const postResponsesRes = {
  "id": 1,
  "idOpportunity": 1,
  "userId": 0,
  "notes": "response free-form text",
  "responseStatus": "string",
  // "timestampStatusChange": "string",
  // "timestampCreated": "string",
  // "organization": "SQL join at response",
  // "firstName": "SQL join at responsen",
  // "lastName": "SQL join at response",
  // "title": "SQL join at response"
};

export const putResponsesId = {
  "id": 0,
  "idOpportunity": 0,
  "userId": 0,
  "notes": "request free-form text",
  "responseStatus": "offered || accepted || deleted || denied"
};

export const putResponsesIdRes = {
  "id": 1,
  "idOpportunity": 1,
  "userId": 1,
  "notes": "response free-form text",
  "responseStatus": "offered || accepted || deleted || denied",
  // "timestampStatusChange": "string",
  // "timestampCreated": "string",
  // "organization": "SQL join at response",
  // "firstName": "SQL join at response",
  // "lastName": "SQL join at response",
  // "title": "SQL join at response"
};
