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
  console.log('timestamp in helper', typeof timestamp, timestamp)
  // is GMT string (but we are working with raw date below) Thu, 30 Nov 2017 21:23:45 GMT
  // is desired format "2017-12-21T16:26:48-05:00"
  if (timestamp instanceof Date) {
    const year = timestamp.getFullYear();
    const month = timestamp.getMonth() + 1; // months are 0-index in date objects, but not in string
    const date = timestamp.getDate();
    const timeSymbol = 'T';
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();
    const offset = '05:00';
    const theString = `${year}-${month}-${date}${timeSymbol}${hours}:${minutes}:${seconds}-${offset}`;
    console.log(theString)
    return theString;
  }
  return '' ;
}

export const convertStringToTimeStamp = (theString, offset = -5) => {
  console.log('string in helper', typeof theString, theString)
  // expected input: 2018-01-19T15:24:45.000Z
 
  if (typeof theString === 'string') {

    const milliSecondsPerHour = 60 * 60 * 1000 ;

    const dateTimeArray = theString.split('T');
    console.log('dateTimeArray',dateTimeArray)
    const dateArray = dateTimeArray[0].split('-');
    console.log('dateArray',dateArray);
    const dateArrayIntegers = dateArray.map(date=>parseInt(date,10));
    console.log('dateArrayIntegers',dateArrayIntegers);
    const timeArraywithZone = dateTimeArray[1].split('.');
    console.log('timeArraywithZone',timeArraywithZone);
    const timeArray =  timeArraywithZone[0].split(':');
    console.log('timeArray',timeArray);
    const timeArrayIntegers = timeArray.map(time=>parseInt(time,10));
    console.log('timeArrayIntegers',timeArrayIntegers);

    const timestamp = new Date();
    console.log('timestamp today',timestamp);

    timestamp.setFullYear(dateArray[0]);
    timestamp.setMonth(dateArray[1] - 1); // months are 0-index in date objects
    timestamp.setDate(dateArray[2]);
    timestamp.setHours(timeArrayIntegers[0]);
    timestamp.setMinutes(timeArrayIntegers[1]);
    timestamp.setSeconds(timeArrayIntegers[2]);
    console.log('timestamp populated',timestamp);

    const adjustedTimestamp = offset < 0 ?
      new Date(timestamp - (offset * milliSecondsPerHour)) :
      new Date(timestamp - (-offset * milliSecondsPerHour)) ;

    console.log('adjustedTimestamp',adjustedTimestamp)
    return adjustedTimestamp;
  }
  return {} ;
}

export const printDateAsString = (date, offset = -5) => {
  console.log('date received',date);
  const milliSecondsPerHour = 60 * 60 * 1000 ;

  const dateOptions = {
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric', 
  hour: 'numeric', 
  minute: 'numeric'
  };
  if (date instanceof Date) {
    const newDate = offset < 0 ?
      new Date(date - (offset * milliSecondsPerHour)) :
      new Date(date - (-offset * milliSecondsPerHour)) ;
    const dateString = newDate.toLocaleDateString('en',dateOptions)
    console.log(dateString);
    return dateString;
  }
  return '';
}