import React from 'react';
import { shallow, render, mount } from 'enzyme';
import { SubmissionError, Field, reduxForm } from 'redux-form';
import { LoginPage } from './login-page';

describe('Core display functionality of LoginPage', () => {

  let subject = null;
	let submitting, touched, error, reset, onSave, onSaveResponse, handleSubmit, dispatch;
	beforeEach(() => {
		submitting = false;
		touched = false;
		error = null;
		reset = jest.fn();
		onSaveResponse = Promise.resolve();
    handleSubmit = jest.fn();
    dispatch = jest.fn();
  });

	const buildWrapper = () => {
		onSave = jest.fn();
    const defaultFieldSettings = {
      value: '',
      touched: touched,
      error: error
    };
    const defaultProps = {
      onSave,
      submitting: submitting,
      // The real redux form has many properties for each field,
      // including onChange and onBlur handlers. We only need to provide
      // the ones that will change the rendered output.
      fields: {
        username: defaultFieldSettings,
        password: defaultFieldSettings,
      },
      handleSubmit,
      reset,
      dispatch,
    }
    const theComponent = shallow(<LoginPage {...defaultProps}/>)
    const theForm = reduxForm({ form: 'registerForm' })(theComponent);
		return theForm;
	}

  it('Smoke test - component should render', () => {
    const wrapper = buildWrapper();
  });

  it('Button should fire', () => {
    const wrapper = buildWrapper();
    expect(wrapper.find('button').simulate('click'));
    expect(handleSubmit.mock.calls.length).toEqual(1);
  });

	it("Submit should fire", () => {
		const wrapper = buildWrapper()
		wrapper.find('form').simulate('submit')
    expect(handleSubmit).toBeCalled()
    // expect(dispatch).toBeCalled()
    console.log('wrapper',wrapper)
  })

  


});