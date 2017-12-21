import {reducer, createStore, applyMiddleware, thunk} from '../store';

describe('store', () => {
  
  it('user should import to combine reducers', () => {
    expect(typeof reducer).toEqual('function');
  });

  it('userViewed should import to combine reducers', () => {    
    expect(typeof createStore).toEqual('function');
  });
  
  it('usersList should import to combine reducers', () => {   
    expect(typeof applyMiddleware).toEqual('function');
  });
  
  it('opportunity should import to combine reducers', () => {   
    expect(typeof thunk).toEqual('function');
  });
});
