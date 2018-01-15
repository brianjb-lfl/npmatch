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