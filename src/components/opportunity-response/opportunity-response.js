import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import './opportunity-response.css';
import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

export class OpportunityResponse extends Component {
  constructor(props) {
    super(props);
    this.oppId = this.props.opportunity.id;
    this.hasResponded = this.props.user.responses[this.oppId] ? true : false ;
    this.response = this.hasResponded ? {
        id: this.props.user.responses[this.oppId].id,
        idOpportunity: this.oppId,
        userId: this.props.user.id,
        notes: this.props.user.responses[this.oppId].notes,
        responseStatus: this.props.user.responses[this.oppId].responseStatus
       } : {
        idOpportunity: this.oppId,
        userId: this.props.user.id,
        notes: '',
        responseStatus: 'offered'
       }
    this.isMyOpportunity = this.props.opportunity.userId === this.props.user.id ? true : false;
  };

  addResponse(formValues) {
    this.response = {...this.response, notes: formValues.notes };
    this.props.dispatch(actionsUser.createOrEditResponse(this.response, this.props.user.authToken, true))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(null))
        this.response.id = this.props.display.latestResponse;
      });
  }

  editResponse(formValues, status) {
    this.response = {...this.response, notes: formValues.notes, responseStatus: formValues.status};
    console.log('response in method', this.response);
    this.props.dispatch(actionsUser.createOrEditResponse(this.response, this.props.user.authToken, false))
      .then(() => this.props.dispatch(actionsDisplay.toggleOpportunity(null)));
  }

  handleFormStatusChange(formStatus) {
    this.props.dispatch(actionsDisplay.setFormStatus(formStatus));
    // this.isInFocus = this.props.display.opportunityId === this.oppId ? true : false;
  }

  toggleOpportunity(id, formStatus) {
    this.props.dispatch(actionsDisplay.toggleOpportunity(id));
    this.props.dispatch(actionsDisplay.setFormStatus(formStatus)); // 'positive' or 'negative'
  }

  render() {
    const isInFocus = this.props.display.opportunityId === this.oppId ? true : false;
    const hasResponded = this.props.user.responses[this.oppId] ? true : false ;
    // console.log('id', this.oppId, 'hasres', this.hasResponded, 'focus', isInFocus, 'mine', this.isMyOpportunity)

    const noteLabel = 'note';
    let buttonLabel = 'Signup';
    if (hasResponded && !this.isMyOpportunity) {
      buttonLabel =  `You're signed up!`;
    } else if (this.isMyOpportunity) {
      buttonLabel = 'This is your project!';
    }
    const submitLabel =    hasResponded         ? `Confirm change`    : 'Confirm';
    const positiveLabel =  this.isMyOpportunity ? 'accept'            : `I'm going!`;
    const positiveAction = this.isMyOpportunity ? 'accepted'          : 'offered';
    const negativeLabel =  this.isMyOpportunity ? 'decline'           : `Sorry, I can't make it`;
    const negativeAction = this.isMyOpportunity ? 'denied'            : 'deleted';

    const notesField = <div>
      <Field
        name='notes'
        id='notes'
        component='textarea'
        type='text'
        placeholder='...send a note to the host'
        value={this.response.notes}
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

    // const formHeader = <div>
    //   <p>My opportunity: {this.isMyOpportunity.toString()} I have responded: {hasResponded.toString()}</p>
    //   <p>My responses: {JSON.stringify(this.response)} isInFocus : {isInFocus.toString()}</p>
    // </div>

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
    if (isInFocus && this.isMyOpportunity) {
      theForm = editForm;
    } else if (isInFocus && !hasResponded) {
      theForm = signUpForm;
    } else if (isInFocus) {
      theForm = editForm;
    }

    return (
      <div className='opportunityResponseBox'>
        <button 
          className='responseButton' 
          onClick={() => this.toggleOpportunity(this.oppId, this.response.responseStatus)}>
          {buttonLabel}
        </button>
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
  reduxForm({ form: 'response', enableReinitialize: true })
)(OpportunityResponse);
