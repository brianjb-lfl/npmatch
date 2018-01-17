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
  let start, end;

  if (typeof object.timestampStart === 'string' && typeof object.timestampEnd === 'string') {
    start = convertStringToTimeStamp(object.timestampStart);
    end = convertStringToTimeStamp(object.timestampEnd);
  } else if (object.timestampStart instanceof Date && object.timestampEnd instanceof Date) {
    start = object.timestampStart;
    end = object.timestampEnd;
  }
  const startEndArray = [printDateAsString(start),printDateAsString(end)]
  return startEndArray.join(' to ');
}

export const convertTimeStampToString = timestamp => {
  // input: Date object (i.e. timestamp) in local time zone
  // output: string in format '2017-12-21T16:26:48-05:00' to send to back end
  if (timestamp instanceof Date) {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; // months are 0-index in date objects, but not in string
    const date = timestamp.getDate();
    const timeSymbol = 'T';
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    const offset = '05:00';
    return `${year}-${month}-${date}${timeSymbol}${hours}:${minutes}:${seconds}-${offset}`;
  }
  return '' ;
}

export const convertStringToTimeStamp = (theString, offset = -5) => {
  // input: string received from back end in UTC format; e.g. '2018-01-19T15:24:45.000Z'
  // calculation: create a date object, inputting values to match the UTC string, then adjust the date by the offset to compensate for UTC
  // output: Date object reflecting current time zone
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

    const adjustedTimestamp = offset < 0 ?
      new Date(timestamp - (-offset * milliSecondsPerHour)) : // - is earlier
      new Date(timestamp - (offset * milliSecondsPerHour)) ; // -- is later
    return adjustedTimestamp;
  }
  return {} ;
}

export const printDateAsString = date => {
  // display date as string to user; NOT formatting for data handling
  const dateOptions = {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: 'numeric', 
    minute: 'numeric'
  };
  if (date instanceof Date) {
    return date.toLocaleDateString('en',dateOptions)
  }
  return '';
}

export const resolveDateTimeConflicts = (prior, current) => {
  // this is to fix this behavior in datetimepicker:
  // changing date works, but changes time to current time.
  // changing time works, but changes date to current date.
  // input: prior = accurate datetime; current = selection that is partially accurate.
  // calculation: determine whether user intended to change date or time. If the user changes the date, the time enters as the current time, which has a 99.94% chance of having either the minutes or seconds be non-zero (or non-30 for minutes). So there is a 0.06% edge case where this fails.  If the current selection has incorrect minutes or seconds, we assume the date changed; if the current selection has 0 or 30 minutes, AND 0 seconds, we assume the time changed. 
  // output: merged datetime:
      // option 1: prior date and currently selected time
      // option 2: currently selected date and prior time
  // all dates and times are handled as the user sees them, not UTC.  UTC conversions are done only when transmitting to and from the back end.
  
  const hoursPrior = prior.getHours();
  const minutesPrior = prior.getMinutes();
  const secondsPrior = prior.getSeconds();

  const hoursCurrent = current.getHours();
  const minutesCurrent = current.getMinutes();
  const secondsCurrent = current.getSeconds();

  let correct = 'time'; // which of current is correct? date or time?
  if (secondsCurrent && secondsCurrent !== 0) {
    correct = 'date';
  } else if (minutesCurrent && (minutesCurrent !== 0 || minutesCurrent !== 30)) {
    correct = 'date';
  }

  let conformedDate;
  if (correct === 'time') {
    conformedDate = prior;
    conformedDate.setHours(hoursCurrent);
    conformedDate.setMinutes(minutesCurrent);
    conformedDate.setSeconds(secondsCurrent);
  } else {
    conformedDate = current;
    conformedDate.setHours(hoursPrior);
    conformedDate.setMinutes(minutesPrior);
    conformedDate.setSeconds(secondsPrior);
  }
  return conformedDate;
}

export const datesAreEqual = (prior, current) => {
  // NOT CURRENTLY USED
  const yearPrior = prior.getUTCFullYear();
  const monthPrior = prior.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
  const datePrior = prior.getUTCDate();
  const hoursPrior = prior.getUTCHours();
  const minutesPrior = prior.getUTCMinutes();
  const secondsPrior = prior.getUTCSeconds();

  const yearCurrent = current.getUTCFullYear();
  const monthCurrent = current.getUTCMonth() + 1; // months are 0-index in date objects, but not in string
  const dateCurrent = current.getUTCDate();
  const hoursCurrent = current.getUTCHours();
  const minutesCurrent = current.getUTCMinutes();
  const secondsCurrent = current.getUTCSeconds();

  if (yearPrior !== yearCurrent) {
    return false;
  } else if (monthPrior !== monthCurrent) {
    return false;
  } else if (datePrior !== dateCurrent) {
    return false;  
  } else if (hoursPrior !== hoursCurrent) {
    return false;  
  } else if (minutesPrior !== minutesCurrent) {
    return false;  
  } else if (secondsPrior !== secondsCurrent) {
    return false;
  }
  return true;
}