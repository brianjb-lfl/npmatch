'use strict';

const compareObjects = (expected, received) => {
  let message = [];
  
  const compare = (expected, received) => {
    if (Array.isArray(expected)) {
      if (Array.isArray(received)) {
        received.forEach((item,index)=>{
          compare(expected[0], item, index);
        });
      } else {
        const typeReceived = typeof received;
        message.push(`expected array but received ${typeReceived}`);
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
        message.push(`expected array but received ${typeReceived}`);
      }
    } else if (Array.isArray(received)) {
      message.push('received an array where expecting a primitive data type');
    } else if (typeof received === 'object') {
      message.push('received an object where expecting a primitive data type');
  
    } else if (typeof expected === 'number' && typeof received === 'string') {
      message.push('expected a number but received a string');
    } else if (typeof expected === 'number' && typeof received === 'boolean') {
      message.push('expected a number but received a boolean');
      
    } else if (typeof expected === 'string' && typeof received === 'number') {
      message.push('expected a string but received a number');
    } else if (typeof expected === 'string' && typeof received === 'boolean') {
      message.push('expected a string but received a boolean');

    } else if (typeof expected === 'boolean' && typeof received === 'number') {
      message.push('expected a boolean but received a number');
    } else if (typeof expected === 'boolean' && typeof received === 'string') {
      message.push('expected a boolean but received a string');

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
