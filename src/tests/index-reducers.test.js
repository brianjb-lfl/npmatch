import {user, userViewed, usersList, opportunity, opportunitiesList, display, general, form} from '../reducers';

describe('reducer - index', () => {
  
  it('user should import to combine reducers', () => {
    expect(typeof user).toEqual('function');
  });

  it('userViewed should import to combine reducers', () => {    
    expect(typeof userViewed).toEqual('function');
  });
  
  it('usersList should import to combine reducers', () => {   
    expect(typeof usersList).toEqual('function');
  });
  
  it('opportunity should import to combine reducers', () => {   
    expect(typeof opportunity).toEqual('function');
  });
  
  it('opportunitiesList should import to combine reducers', () => {   
    expect(typeof opportunitiesList).toEqual('function');
  });
  
  it('display should import to combine reducers', () => {   
    expect(typeof display).toEqual('function');
  });
  
  it('general should import to combine reducers', () => { 
    expect(typeof general).toEqual('function');
  });
  
  it('form should import to combine reducers', () => {   
    expect(typeof form).toEqual('function');
  });
});
