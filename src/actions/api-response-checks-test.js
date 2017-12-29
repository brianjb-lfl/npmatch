'use strict';

const compareObjects = (expected, received) => {
  console.log('expected at compare',expected);
  console.log('received at compare',received);
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
      console.log('######## object')
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


const expected = {
  'skills': [
    'string'
  ],
  'causes': [
    'string'
  ],
  'users': [
    {
      'id': 0,
      'username': 'string',
      'userType': 'string',
      'firstName': 'string',
      'lastName': 'string',
      'organization': 'string',
      'logo': 'string',
      // 'extraKey': false,
      'bio': 'string',  // this can be listed twice and pass the test; this is out of original order
      'locationCity': 'string',
      'locationState': 'string',
      'locationCountry': 'string',
      'availability': 'string',
      // 'bio': 'string',
      'links': [
        {
          'linkType': 'string',
          'linkUrl': 'string',
          // 'extraKey': false,
        }
      ],
      'causes': [ // this one is correct
        'string'
      ],
      // 'causes': {
      //   shouldnotbe: 'object'
      // },
      // 'causes': 'string',
      'skills': [
        'string'
      ]
    }
  ]
};

const received = {
  'skills': [
    'string'
  ],
  'causes': [
    'string'
  ],
  'users': [
    {
      'id': 0,
      'username': 'string',
      'userType': 'string',
      'firstName': 'string',
      'lastName': 'string',
      'organization': 'string',
      'logo': 'string',
      'locationCity': 'string',
      'locationState': 'string',
      'locationCountry': 'string',
      'availability': 'string',
      'bio': 'string',
      'links': [ // this one is correct
        {
          'linkType': 'string',
          // 'linkType': {key:'value',foo:'bar'},
          'linkUrl': 'string',
          // 'extraKey': 'string'
        }
      ],
      // 'links': { // this is incorrect
      //   'linkType': 'string',
      //   'linkUrl': 'string',
      //   // 'extraKey': 'string'
      // },
      'causes': [
        'string'
      ],      
      // 'causes': 'string', // this is not correct
      'skills': [
        'string'
      ]
    }
  ]
};

compareObjects(expected, received);
