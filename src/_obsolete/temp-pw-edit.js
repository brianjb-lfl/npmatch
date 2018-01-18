const fetchUsersList = () => {
  const url = new URL(`${REACT_APP_BASE_URL}/api/users/list`);
  const headers = {
    'content-type': 'application/json',
  }; 
  const init = { 
    method: 'GET',
    headers,
  };
  console.log('init at users list',init)
  return fetch(url, init)    
    .then(res=>{
      return res.json();
    })
}
export const changePwToU = () => dispatch => {
  dispatch(actionsDisplay.changeDisplayStatus('loading'));
  return fetchUsersList()
    .then(usersList=>{
      console.log('usersList',usersList);
      const newUsersList = usersList.map(user=>{
        return {...user, password: user.username};
      });
      console.log('newUsersList', newUsersList);
      const arrayOfPromises = newUsersList.map(user=>{
        const url = `${REACT_APP_BASE_URL}/api/users/${user.id}`;
        const headers = { 
          'Content-Type': 'application/json',
        };
        const init = { 
          method: 'PUT',
          body: JSON.stringify(user),
          headers
        };
        return fetch(url, init)   
          .then(user=>{ 
          if (!user.ok) { 
            return Promise.reject(user.statusText);
          }
          return user.json();
          })
      })
      console.log(arrayOfPromises)
      return Promise.all(arrayOfPromises);
    })
    .then(()=>{
      console.log('done')
      dispatch(actionsDisplay.changeDisplayStatus('normal'));
    });
}