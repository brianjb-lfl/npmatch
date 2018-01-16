import React from 'react';

export const stringArrayOfObjects=(array,key)=>{
  // input: [ {}, {} ]      output ['','']
  if (Array.isArray(array)) {
    return array.map(item=>item[key])
  }
  return [];
}

export const arrayToObject=(array,key='id')=>{
  // input: [ {id:0}, {id:1} ]      output {0:{},1:{}}
  const newObject = {};
  if (Array.isArray(array)) {
    array.forEach(item=>newObject[item[key]] = item);
    return newObject;
  }
  return {};
}

export const objectToArray=(object)=>{
  // input {0:{},1:{}}         output: [ {}, {} ]      
  const newArray = [];
  if (typeof object === 'object' && !Array.isArray(object)) {
    for (let prop in object) {
      newArray.push(object[prop]);
    }
    return newArray;
  }
  return [];
}

export const formattedLocation = (object) => {
  let cityState;
  const city = object.locationCity;
  const state = object.locationState;
  const country = object.locationCountry;

  if (city && state) {
    cityState = `${city}, ${state}`;
  } else if (city) {
    cityState = city;
  } else if (state) {
    cityState = state;
  }
  let cityStateCountry;
  if (cityState && country) {
    cityStateCountry = `${cityState}, ${country}`;
  } else if (cityState) {
    cityStateCountry = cityState;
  } else if (country) {
    cityStateCountry = country;
  }
  return cityStateCountry;
}

export const formatUserName = user => {
  if (!(user)) {
    return 'Anonymous'
  } else if ( user.title ) { // this is the case for opportunities
    return user.title;
  } else if ( user.userType === 'organization' || user.organization) {
    return user.organization;
  } else if ( user.firstName && user.lastName) {
    return `${user.firstName} ${user.lastName}`;
  } else if ( user.firstName ) {
    return user.firstName;
  } else if ( user.lastName ) {
    return user.lastName;
  } else {
    return 'Anonymous User'
  }
};

export const formatSkillsIcon = (skills, user) => {
  const userName = formatUserName(user) || 'This user';
  const skillsArray = Array.isArray(skills) ?
    skills.map((skill, index)=>{
      return <li key={index} className='skillIcon tooltip'>{skill}
        <div className='popover popoverWide2'>{userName} is skilled at {skill}</div>
      </li>
    }) :
    null ;
  return skillsArray;
}

export const formatCausesIcon = (causes, user) => {
  const userName = formatUserName(user) || 'This user';
  const causesArray = Array.isArray(causes) ?
    causes.map((cause, index)=>{
      return <li key={index} className='causeIcon tooltip'>{cause}
        <div className='popover popoverWide2'>{userName} supports {cause}</div>
      </li>
    }) :
    null ;
  return causesArray;
}

export const formatLinksIcon = links => {
  let linksArray = null;
  if (Array.isArray(links)) { // nested ifs to avoid breaking at each of 3 levels of the object (otherwise fails if not array, or if empty array)
    if (links[0]) {
      if (links[0].linkUrl) {
        linksArray = links.map((link, index) => {
          return <div key={index} className='linkIcon tooltip'>
            <a href={link.linkUrl} target={'_blank'}>
              <i className="fa fa-globe" aria-hidden="true"></i>
            </a>
            <div className='popover popoverWide3'><p>{link.linkUrl}</p></div>
          </div>
        });
      }
    }
  } else if (typeof links === 'string' && links.length > 0) {
    linksArray = <div className='linkIcon tooltip'>
      <a href={links} target={'_blank'}>
        <i className="fa fa-globe tooltip" aria-hidden="true"></i>
      </a>
      <div className='popover popoverWide3'><p>{links}</p></div>
    </div>
  }
  return linksArray;
}

export const formatTimeframe = object => {
  return `${object.timestampStart} to ${object.timestampEnd}`;
}

export const convertTimeStampToString = timestamp => {
  // is GMT string (but we are working with raw date below) Thu, 30 Nov 2017 21:23:45 GMT
  // is desired format "2017-12-21T16:26:48-05:00"
  if (timestamp instanceof Date) {
    const year = timestamp.getUTCFullYear();
    const month = timestamp.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
    const date = timestamp.getUTCDate();
    const timeSymbol = 'T';
    const hours = timestamp.getUTCHours();
    const minutes = timestamp.getUTCMinutes();
    const seconds = timestamp.getUTCSeconds();
    const offset = '05:00';
    return `${year}-${month}-${date}${timeSymbol}${hours}:${minutes}:${seconds}-${offset}`;
  }
  return '' ;
}

export const convertStringToTimeStamp = (theString, offset = -5) => {
  console.log('theString to convert', theString)
  // expected input: 2018-01-19T15:24:45.000Z
  if (typeof theString === 'string') {
    const milliSecondsPerHour = 60 * 60 * 1000 ;

    const dateTimeArray = theString.split('T');
    const dateArray = dateTimeArray[0].split('-');
    const dateArrayIntegers = dateArray.map(date=>parseInt(date,10));
    const timeArraywithZone = dateTimeArray[1].split('.');
    const timeArray =  timeArraywithZone[0].split(':');
    const timeArrayIntegers = timeArray.map(time=>parseInt(time,10));

    const timestamp = new Date();

    timestamp.setFullYear(dateArrayIntegers[0]);
    timestamp.setMonth(dateArrayIntegers[1] - 1); // months are 0-index in date objects
    timestamp.setDate(dateArrayIntegers[2]);
    timestamp.setHours(timeArrayIntegers[0]);
    timestamp.setMinutes(timeArrayIntegers[1]);
    timestamp.setSeconds(timeArrayIntegers[2]);

    console.log('timestamp before offset', timestamp); // this will be GMT, we need to offset it 2x
    console.log('neg offset', offset < 0 );
    console.log('neg',new Date(timestamp - (offset * milliSecondsPerHour)));
    console.log('dbl neg',new Date(timestamp - (-offset * milliSecondsPerHour)));
    console.log(offset * milliSecondsPerHour);
    const adjustedTimestamp = offset < 0 ?
      new Date(timestamp - (-offset * milliSecondsPerHour)) : // - is earlier
      new Date(timestamp - (offset * milliSecondsPerHour)) ; // -- is later
    console.log('adjustedTimestamp',adjustedTimestamp)
    return adjustedTimestamp;
  }
  return {} ;
}

export const printDateAsString = date => {
  console.log('printDateAsString date received',date);
  const dateOptions = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric'
  };
  if (date instanceof Date) {
    const dateString = date.toLocaleDateString('en',dateOptions)
    console.log('printDateAsString final dateString',dateString);
    return dateString;
  }
  return '';
}

export const resolveDateTimeConflicts = (prior, current) => {
  const offset = 5;
  // this is to fix this behavior in datetimepicker:
  // changing date works, but changes time to current time.
  // changing time works, but changes date to current date.
  // input: prior accurate datetime, current selection that is partially accurae
  // output: merged datetime using date from one, time from the other, making correct selections
  
  const yearPrior = prior.getFullYear();
  const monthPrior = prior.getMonth() + 1; // months are 0-index in date objects, but not in string
  const datePrior = prior.getDate();
  const hoursPrior = prior.getHours();
  const minutesPrior = prior.getMinutes();
  const secondsPrior = prior.getSeconds();
  console.log('prior value',yearPrior, monthPrior, datePrior, hoursPrior, minutesPrior, secondsPrior)

  const yearPrior2 = prior.getUTCFullYear();
  const monthPrior2 = prior.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
  const datePrior2 = prior.getUTCDate();
  const hoursPrior2 = prior.getUTCHours();
  const minutesPrior2 = prior.getUTCMinutes();
  const secondsPrior2 = prior.getUTCSeconds();
  console.log('UTC prior value',yearPrior2, monthPrior2, datePrior2, hoursPrior2, minutesPrior2, secondsPrior2)

  const yearCurrent = current.getFullYear();
  const monthCurrent = current.getMonth() + 1; // months are 0-index in date objects, but not in string
  const dateCurrent = current.getDate();
  const hoursCurrent = current.getHours();
  const minutesCurrent = current.getMinutes();
  const secondsCurrent = current.getSeconds();
  console.log('current choice',yearCurrent, monthCurrent, dateCurrent, hoursCurrent, minutesCurrent, secondsCurrent)

  // const yearCurrent2 = current.getUTCFullYear();
  // const monthCurrent2 = current.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
  // const dateCurrent2 = current.getUTCDate();
  // const hoursCurrent2 = current.getUTCHours();
  // const minutesCurrent2 = current.getUTCMinutes();
  // const secondsCurrent2 = current.getUTCSeconds();
  // console.log('UTC current choice',yearCurrent2, monthCurrent2, dateCurrent2, hoursCurrent2, minutesCurrent2, secondsCurrent2)

  let correct = 'time'; // which of current is correct? date or time?
  if (secondsCurrent && secondsCurrent !== 0) {
    console.log('seconds are non-zero', secondsCurrent)
    correct = 'date';
  } else if (minutesCurrent && (minutesCurrent !== 0 || minutesCurrent !== 30)) {
    console.log('minutes are non-zero, non-3-', minutesCurrent)
    correct = 'date';
  }

  // const dateAdjuster = hoursPrior < offset ? 1 : 0 ;
  // const dateAdjuster2 = hoursPrior2 < offset ? 1 : 0 ;
  // console.log('dateAdjuster', dateAdjuster, 'UTC', dateAdjuster2);
  let conformedDate;
  if (correct === 'time') {
    console.log('time is correct')
    conformedDate = prior;
    conformedDate.setHours(hoursCurrent);
    conformedDate.setMinutes(minutesCurrent);
    conformedDate.setSeconds(secondsCurrent);
  } else {
    console.log('date is correct')
    conformedDate = current;
    conformedDate.setHours(hoursPrior);
    conformedDate.setMinutes(minutesPrior);
    conformedDate.setSeconds(secondsPrior);
  }
  console.log('conformedDate',conformedDate)
  return conformedDate;
}

// export const datesAreEqual = (prior, current) => {
//   const yearPrior = prior.getUTCFullYear();
//   const monthPrior = prior.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
//   const datePrior = prior.getUTCDate();
//   const hoursPrior = prior.getUTCHours();
//   const minutesPrior = prior.getUTCMinutes();
//   const secondsPrior = prior.getUTCSeconds();
//   console.log('equality: prior value',yearPrior, monthPrior, datePrior, hoursPrior, minutesPrior, secondsPrior)

//   const yearCurrent = current.getFullYear();
//   const monthCurrent = current.getMonth() + 1; // months are 0-index in date objects, but not in string
//   const dateCurrent = current.getDate();
//   const hoursCurrent = current.getHours();
//   const minutesCurrent = current.getMinutes();
//   const secondsCurrent = current.getSeconds();
//   console.log('equality: current choice',yearCurrent, monthCurrent, dateCurrent, hoursCurrent, minutesCurrent, secondsCurrent)

//   if (yearPrior !== yearCurrent) {
//     console.log('inequality year')
//     return false;
//   } else if (monthPrior !== monthCurrent) {
//     console.log('inequality month')
//     return false;
//   } else if (datePrior !== dateCurrent) {
//     console.log('inequality date')
//     return false;  
//   } else if (hoursPrior !== hoursCurrent) {
//     console.log('inequality hours')
//     return false;  
//   } else if (minutesPrior !== minutesCurrent) {
//     console.log('inequality minutes')
//     return false;  
//   } else if (secondsPrior !== secondsCurrent) {
//     console.log('inequality seconds')
//     return false;
//   }
//   return true;
// }