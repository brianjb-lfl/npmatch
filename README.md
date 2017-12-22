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

Two primary tables
  user                the user who is logged in
    links             join tables...
    causes
    skills
    adminOf
    admins
    following
    opportunities
    responses
  
  userViewed          a single user that is in focus; same structure as user
  
  opportunity         a single opportunity that is in focus
    causes            join tables...
    responses   

  usersList           lists of users; used anytime a list is needed
    main              main list of users (additional lists may be added via additional keys)
  opportunitiesList   lists of opportunities; used anytime a list is needed
    main              main list of opportunities (additional lists may be added via additional keys)
  
  display
    view
    modal
    modalMessage
    userId
    opportunityId
  
  general
    causes
    skills
    offerTypes
    oppTypes
    linkTypes
    states
    countries
