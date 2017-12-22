This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
You can find the most recent version of the React guide [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Folder Structure

```
my-app/
  build/
  coverage/
  documents/          miscellaneous documentation; not used by app
  node_modules/
  public/
    font-awesome/
    index.html
    favicon.ico
    manifest.json
  src/
    actions/          all Redux actions; see State below for additional detail
    components/       all React components; see Components below for additional detail
    reducers/         all Redux reducers; see State below for additional detail
    tests/            all Redux testing (React testing is comingled with components)
    App.css
    App.js            top level component
    App.test.js
    index.css
    index.js          top level script
    logo.svg
    store.js          Redux store; see State below for additional detail
  .env
  .netlify
  package-lock.json
  package.json
  README.md           this.file!
```

## Navigation

Routes
list all

## State

Refer to API documentation...

```
Two primary tables
  user                the user who is logged in
    links             join tables...
    causes
    skills
    adminOf           hashmap format (key is id of organization)
    admins            hashmap format (key is id of organization)
    following         hashmap format (key is id of organization)
    opportunities     hashmap format (key is id of organization)
    responses         hashmap format (key is id of opportunity)
  
  userViewed          a single user that is in focus; same structure as user
  
  opportunity         a single opportunity that is in focus
    causes            join tables...
    responses   

  usersList           lists of users; used anytime a list is needed
    main              main list of users (additional lists may be added via additional keys)
  opportunitiesList   lists of opportunities; used anytime a list is needed
    main              main list of opportunities (additional lists may be added via additional keys)
  
  display             used for general display variables; NOT for overall navigation
    view              variables related to current view settings
    latestResponse    id of latest response (used as temporary container after response is created or edited)
    modal             boolean: modal showing or hidden
    modalMessage      message in modal; used to relay error messages to user
    userId            id of user who is in focus (used to create reliable way to find this id)
    opportunityId     id of opportunity in focus (used to create reliable way to find this id)
  
  general             non-variable items; used for static value lists
    causes
    skills
    offerTypes
    oppTypes
    linkTypes
    states
    countries
```

## Components

Component tree...
