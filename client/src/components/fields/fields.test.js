import React from 'react';
import renderer from 'react-test-renderer';
import { reduxForm } from 'redux-form';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
// import { shallow, mount } from 'enzyme';

import  CausesFields ,{ mapStateToProps as  mapStateToPropsCauses } from './causes';
import { LinkFields , mapStateToProps as  mapStateToPropsLink } from './links';
import { LocationFields , mapStateToProps as  mapStateToPropsLocation } from './location';
import { IndivNameFields } from './name-indiv';
import { OrgNameFields } from './name-indiv';
import { SkillsFields , mapStateToProps as  mapStateToPropsSkills } from './skills';
import { StartEndFields } from './start-end';
import { UandPFields } from './u-and-pw';

const spy = jest.fn();
const state = {};
const general = {
  causes:['a','b'],
  skills:['a','b'],  
}
const action = {general};

const fakeReducer = (state, action) => {
  return {...action}
}
const store = createStore(()=>fakeReducer(state,action));
// const store = createStore(()=>{});
// const CausesFieldsProps = <CausesFields general={general}/>
console.log('action',action);
console.log('store',store);
console.log('store.getState',store.getState());

describe('CausesFields unit tests', () => {

  // const Decorated = reduxForm({ form: 'testForm' })(CausesFields);
  // describe('Products Component snapshot', () => {
  //   it('should render the snapshot', () => {
  //     const tree = renderer.create(
  //       <Provider store={store}>
  //         <Decorated
  //           handleSubmit={spy}
  //           submitting={false}
  //           submit={spy}
  //         /></Provider>
  //     ).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });

});

describe('IndivNameFields unit tests', () => {

  // const Decorated = reduxForm({ form: 'testForm' })(IndivNameFields);
  // describe('Products Component snapshot', () => {
  //   it('should render the snapshot', () => {
  //     const tree = renderer.create(
  //         <Decorated
  //           handleSubmit={spy}
  //           submitting={false}
  //           submit={spy}
  //         />
  //     ).toJSON();
  //     expect(tree).toMatchSnapshot();
  //   });
  // });
  
});


// describe('causes fields component display functionality', () => {

//   it('Smoke test - CausesFields component should render', () => {
//     mount(<CausesFields />);
//   });
//   it('Should map state to props - CausesFields', () => {
//     const initialState = {
//       general: 'causes',
//       otherKeys: 'should not map'
//     };
//     const expectedProps = { 
//       general: 'causes'
//     };
//     const mockState = mapStateToPropsCauses(initialState);
//     expect(mockState).toEqual(expectedProps);
//   });
//   it('Smoke test - LinkFields component should render', () => {
//     mount(<LinkFields />);
//   });
//   it('Should map state to props - LinkFields', () => {
//     const initialState = {
//       general: 'causes',
//       otherKeys: 'should not map'
//     };
//     const expectedProps = { 
//       general: 'causes'
//     };
//     const mockState = mapStateToPropsLink(initialState);
//     expect(mockState).toEqual(expectedProps);
//   });
//   it('Smoke test - LocationFields component should render', () => {
//     mount(<LocationFields />);
//   });
//   it('Should map state to props - LocationFields', () => {
//     const initialState = {
//       general: 'causes',
//       otherKeys: 'should not map'
//     };
//     const expectedProps = { 
//       general: 'causes'
//     };
//     const mockState = mapStateToPropsLocation(initialState);
//     expect(mockState).toEqual(expectedProps);
//   });
//   it('Smoke test - IndivNameFields component should render', () => {
//     mount(<IndivNameFields />);
//   });
//   it('Smoke test - OrgNameFields component should render', () => {
//     mount(<OrgNameFields />);
//   });
//   it('Smoke test - SkillsFields component should render', () => {
//     mount(<SkillsFields />);
//   });
//   it('Should map state to props - SkillsFields', () => {
//     const initialState = {
//       general: 'causes',
//       otherKeys: 'should not map'
//     };
//     const expectedProps = { 
//       general: 'causes'
//     };
//     const mockState = mapStateToPropsSkills(initialState);
//     expect(mockState).toEqual(expectedProps);
//   });
//   it('Smoke test - StartEndFields component should render', () => {
//     mount(<StartEndFields />);
//   });
//   it('Smoke test - UandPFields component should render', () => {
//     mount(<UandPFields />);
//   });

// });