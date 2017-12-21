import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './opportunity-response.css';
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

export class OpportunityResponse extends Component {

  addResponse(formValues) {
    const response = {
      idOpportunity: this.props.opportunity.id,
      userId: this.props.user.id,
      notes: formValues.notes,
    }
    this.props.dispatch(actionsUser.createOrEditResponse(response, this.props.user.authToken, true))
      .then(() => this.props.dispatch(actionsDisplay.toggleOpportunity(null)));
  }

  editResponse(formValues, status) {
    this.props.dispatch(actionsUser.createOrEditResponse(formValues, this.props.user.authToken, false))
      .then(() => this.props.dispatch(actionsDisplay.toggleOpportunity(null)));
  }

  handleFormStatusChange(formStatus) {
    this.props.dispatch(actionsDisplay.setFormStatus(formStatus));
  }

  toggleOpportunity(id, formStatus) {
    this.props.dispatch(actionsDisplay.toggleOpportunity(id));
    this.props.dispatch(actionsDisplay.setFormStatus(formStatus))
  }

  render() {
    // calculate whether user has responded
    const user = this.props.user;
    const opportunity = this.props.opportunity;
    const id = opportunity.id;
    const isInFocus = this.props.display.opportunityId === id ? true : false;

    let hasResponded = false;
    const isMyOpportunity = opportunity.userId === user.id ? true : false;

    let initialValues = opportunity;
    if (typeof user.responses === 'object') {
      if (typeof user.responses[id] === 'object') {
        hasResponded = true;
        initialValues.note = user.responses[id].note;
      }
    }

    const noteLabel = 'note';
    const buttonLabel = hasResponded ? `You're signed up!` : 'Signup';
    const submitLabel = hasResponded ? `Confirm change` : 'Confirm';
    const positiveLabel = isMyOpportunity ? 'accept' : `I'm going!`;
    const positiveAction = isMyOpportunity ? 'accepted' : 'offered';
    const negativeLabel = isMyOpportunity ? 'decline' : `Sorry, I can't make it`;
    const negativeAction = isMyOpportunity ? 'denied' : 'deleted';

    const notesField = <div>
      <Field
        name='notes'
        id='notes'
        component='input'
        type='text'
        initialValues={'initialValues.note'}
        className='inputField' />
      <label
        className='inputLabel'
        htmlFor={'notes'}>{noteLabel}
      </label>
    </div>;

    const statusFieldPositive = <div>
      <Field
        name='status'
        id='statusPositive'
        value={positiveAction}
        component='input'
        type='radio'
        className='inputFieldHidden'
        style={{ display: 'none', margin: 'auto' }}
        onChange={() => this.handleFormStatusChange('positive')} />
      <label
        className='inputLabel'
        htmlFor={'statusPositive'}
        style={{
          backgroundColor: this.props.display.formStatus === 'positive' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.props.display.formStatus === 'positive' ? 'white' : '#082E41'
        }}
      >{positiveLabel}</label>
    </div>;

    const statusFieldNegative = <div>
      <Field
        name='status'
        id='statusNegative'
        value={negativeAction}
        component='input'
        type='radio'
        className='inputFieldHidden'
        style={{ display: 'none', margin: 'auto' }}
        onChange={() => this.handleFormStatusChange('negative')} />
      <label
        className='inputLabel'
        htmlFor={'statusNegative'}
        style={{
          backgroundColor: this.props.display.formStatus === 'negative' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.props.display.formStatus === 'negative' ? 'white' : '#082E41'
        }}
      >{negativeLabel}</label>
    </div>;

    const signUpForm = <div>
      <form className='opportunityResponse'
        onSubmit={this.props.handleSubmit(formValues => this.addResponse(formValues))}
      >
        {notesField}
        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.submitting}>{submitLabel}
          </button>
        </div>
      </form>
    </div>

    const editForm = <div>
      <form className='opportunityResponse'
        onSubmit={this.props.handleSubmit(formValues => this.editResponse(formValues, positiveAction))}
      >
        {notesField}
        {statusFieldNegative}
        {statusFieldPositive}
        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.submitting}>{submitLabel}
          </button>
        </div>
      </form>
    </div>

    let theForm;
    if (isInFocus && !hasResponded) {
      theForm = signUpForm;
    } else if (isInFocus) {
      theForm = editForm;
    }

    return (
      <div className='opportunityResponseBox'>
        <button className='responseButton' onClick={() => this.toggleOpportunity(opportunity.id, initialValues.responseStatus)}>{buttonLabel}</button>
        {theForm}
      </div>
    );
  }
}


export const mapStateToProps = state => ({
  user: state.user,
  display: state.display,
})

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'response', enableReinitialize: true, initialValues: { notes: 'test' } })
)(OpportunityResponse);
