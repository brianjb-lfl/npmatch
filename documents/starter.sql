-- drop database if exists whatisourdbname;
drop table if exists users_skills;
drop table if exists users_causes;
drop table if exists opps_causes;

drop table if exists roles;
drop table if exists responses;

drop table if exists opps;

drop table if exists users;

drop table if exists causes;
drop table if exists skills;
-- CREATE DATABASE whatisourdbname;

CREATE TABLE users (
  id serial primary key,
  timestampCreated timestamp default current_timestamp,
  username text,
  passwd text,
  -- type: individual, organization
  userType text default 'individual',
  location_city text,
  location_state text,
  -- default "USA"
  location_country text,
  -- below for individuals only
  firstName text default null,
  lastName text default null, 
  -- below for organizations only
  organization text default null,
  link text default null
);

CREATE TABLE opps (
  id serial primary key,
  timestampCreated timestamp default current_timestamp,
  -- type: goods, services, financial
  oppType text default 'services',
  -- offer: true if offer to provide, false if a need
  offer boolean default 'false',
  title text not null,
  -- do we want description and identification of need combined?
  narrative text not null,
  timestamp_start timestamp,
  timestamp_end timestamp,
  location_city text,
  location_state text,
  --default "USA"
  location_country text,
  -- the user below is the "owner" of this opportunity
  id_user integer references users on delete cascade,
  -- link = url for the event (do not populate [on front] if the same as the user's url)
  link text default null
);

-- @@@@@@@@@@@ CAUSES @@@@@@@@@@@

CREATE TABLE causes (
  id serial primary key,
  cause text
);

CREATE TABLE users_causes (
  id serial primary key,
  id_user integer references users on delete cascade,
  id_cause integer references causes on delete cascade,
  timestampCreated timestamp default current_timestamp
);

CREATE TABLE opps_causes (
  id serial primary key,
  id_opp integer references opps on delete cascade,
  id_cause integer references causes on delete cascade,
  timestampCreated timestamp default current_timestamp
);

-- @@@@@@@@@@@ SKILLS @@@@@@@@@@@

CREATE TABLE skills (
  id serial primary key,
  skill text
);

CREATE TABLE users_skills (
  id serial primary key,
  id_user integer references users on delete cascade,
  id_skill integer references skills on delete cascade,
  timestampCreated timestamp default current_timestamp
);

-- @@@@@@@@@@@ ROLES & RESPONSES @@@@@@@@@@@

CREATE TABLE roles (
  id serial primary key,
  -- org adds admin; org is user_adding, admin is user_receiving, role is admin
  -- indiv follows org; indiv is user adding; or is user receiving, role is following
  id_user_adding integer references users on delete cascade,
  id_user_receiving integer references users on delete cascade,
  -- capabilities: admin, following (limit admin to editing posts)
  -- look up format for array
  capabilities text,
  timestampCreated timestamp default current_timestamp
);

CREATE TABLE responses (
  id serial primary key,
  id_user integer references users on delete cascade,
  id_opp integer references opps on delete cascade,
  -- status pending, accepted, completed, deleted, denied
  respStatus text default 'pending',
  -- timestampStatusChange = most recent status change
  timestampStatusChange timestamp,
  timestampCreated timestamp default current_timestamp
);

-- @@@@@@@@@@@ END CREATE TABLE, START INSERT INTO @@@@@@@@@@@

INSERT into users 
(username, userType, location_city, location_state, firstName, lastName, organization, link) 
VALUES
('bobsmith', 'individual', 'Baltimore', 'MD', 'Bob', 'Smith', null, null), 
('suesmith', 'individual', 'Waldorf', 'MD', 'Sue', 'Smith', null, null), 
('capfoodbank', 'organization', 'Washington', 'DC', null, null, 'Capital Food Bank', 'www.cfb.org'),
('some', 'organization', 'Washington', 'DC', null, null, 'So Others May Eat (SOME)', 'www.some.org'),
('joejoe', 'individual', 'Altoona', 'PA', 'Joe', 'Josephson', null, null);


INSERT into opps 
(oppType, offer, title, narrative, timestamp_start, timestamp_end, location_city, location_state, id_user, link) 
VALUES
('goods', 'false', 'need baked goods', 'We need baked goods for a charity event.', '2018-02-14 18:30:00', '2018-02-14 20:30:00', 'Plano', 'TX', 3, null), 
('services', 'false', 'volunteers needed!', 'Reading to children after school, ongoing basis.', '2018-03-01 15:00:00', 'infinity', 'Athens', 'GA', 4, null), 
('financial', 'false', 'money to buy books', 'We want to raise $15,000,000 to buy a boatload of books! Then we will ship them to Georgia.', '2018-01-01 12:00:00', 'infinity', 'Providence', 'RA', 4, null), 
('services', 'true', 'I tutor math', 'I love algegra and trig and would gladly tutor students from 3:30 to 4:30 on weekdays.', '2018-02-01 15:30:00', '2018-12-31 16:30:00', 'Detroit', 'MI', 1, 'http://www.mrtutor.com');

INSERT into causes 
(cause) 
VALUES
('children'), ('homelessness'), ('hunger'), ('elderly'), ('education'), ('health'), ('environment'), ('community'), ('illiteracy'), ('social justice');

INSERT into skills 
(skill) 
VALUES
('listening'), ('tutoring'), ('administrative'), ('clerical'), ('medical services'), ('legal services'), ('manual labor'), ('meal preparation'), ('driving'), ('construction'), ('working with children'), ('working with adults'), ('working with elderly'), ('working with disabled'), ('working with animals');


INSERT into users_causes 
(id_user, id_cause)
VALUES
(1,2),(1,3),(2,4),(3,5),(3,7),(3,10),(4,9),(1,6);

INSERT into opps_causes
(id_opp, id_cause)
VALUES
(1,2),(1,3),(2,1),(2,5),(2,9),(3,1),(3,5),(3,9),(4,1),(4,5),(4,8);

INSERT into users_skills
(id_user, id_skill)
VALUES
(1,1),(1,2),(1,6),(2,7),(2,8),(2,13),(2,15);

INSERT into roles
(id_user_adding, id_user_receiving, capabilities)
VALUES
(3,1,'admin'),(5,3,'following'),(2, 4, 'following');

INSERT into responses
(id_user, id_opp, respStatus, timestampStatusChange)
VALUES
(5,4,'pending',null),(1,3,'pending',null),(2, 2, 'accepted', '2017-12-05 11:45:03');