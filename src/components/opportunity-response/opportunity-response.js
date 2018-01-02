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
    this.state = {
      oppId: this.props.response ? this.props.response.id : this.props.opportunity.id,
      hasResponded: this.props.response ? true : (
        this.props.user.responses[this.props.opportunity.id] ? true : false ),
      isMyOpp: this.props.response ? false : (
        this.props.opportunity.userId === this.props.user.id ? true : false ),
      response: {},
      formStatus: 'positive',
      submitLabel: 'Confirm',
      positiveLabel: `I'm going!`,
      positiveResponse: 'offered',
      negativeLabel: `Sorry, I can't make it`,
      negativeResponse: 'deleted',
      noteLabel: 'note',
      buttonLabel: 'Sign up',  
    }
  };

  componentDidMount() {
    if (this.props.response) { // if this preview is a response; response is injected from UserProfile
      const formStatus = (this.props.response.responseStatus === 'offered' || 
        this.props.response.responseStatus === 'accepted' ) ? 'positive' : 'negative';
      const buttonLabel = this.props.response.responseStatus; // format this better
      this.setState({ 
        response: this.props.response,
        formStatus,
        submitLabel: 'Confirm change',
        buttonLabel
      })
    }
    else if (this.state.hasResponded && !this.state.isMyOpp) { // if this preview is an opp, but user has responded
      const formStatus = (this.props.user.responses[this.state.oppId].responseStatus === 'offered' || 
        this.props.user.responses[this.state.oppId].responseStatus === 'accepted' ) ? 'positive' : 'negative';
      this.setState({
        response: {
          id: this.props.user.responses[this.state.oppId].id,
          idOpportunity: this.state.oppId,
          userId: this.props.user.id,
          notes: this.props.user.responses[this.state.oppId].notes,
          responseStatus: this.props.user.responses[this.state.oppId].responseStatus
        },
        formStatus,
        submitLabel: 'Confirm change',
        buttonLabel: formStatus === 'positive' ? `You're signed up!` : 'Sign up' ,
      })
        
    } else if (this.state.isMyOpp) {
      this.setState({
        positiveLabel:'accept',
        positiveResponse:'accepted',
        negativeLabel:'decline',
        negativeResponse:'denied',
        buttonLabel: 'This is my project',
      })
    } else {
      this.setState({
        response: {
          idOpportunity: this.state.oppId,
          userId: this.props.user.id,
          notes: '',
          responseStatus: 'offered'
        }
      })
    }
  }

  addResponse(formValues) {
    const newResponse = {...this.state.response, notes: formValues.notes };
    const isNew = true;
    this.props.dispatch(actionsUser.createOrEditResponse(newResponse, this.props.user.authToken, isNew))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(null))
        const newId = this.props.display.latestResponse;
        this.setState({
          response: {...newResponse, id: newId},
          buttonLabel: `You're signed up!`
        });
      });
  }

  editResponse(formValues) {
    // formStatus of positive or negative is maintained in state in advance of submission
    const responseStatus = this.state.formStatus === 'positive' ? this.state.positiveResponse : this.state.negativeResponse ;
    const newResponse = {...this.state.response, notes: formValues.notes, responseStatus};
    const isNew = false;
    this.props.dispatch(actionsUser.createOrEditResponse(newResponse, this.props.user.authToken, isNew))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(null));
        this.setState({
          response: newResponse,
        });      
      });
  }

  handleFormStatusChange(formStatus) { // form captures actual value on submission; this step just filters values by positive and negative to change formatting in the UI
    const buttonLabel = this.state.isMyOpp ? this.setState.buttonLabel : (
      formStatus === 'positive' ? `You're signed up!` : 'Sign up' 
    );
    this.setState({
      formStatus,
      buttonLabel
    });
  }

  toggleOpportunity(id) {
    this.props.dispatch(actionsDisplay.toggleOpportunity(id));
    this.props.reset();
  }

  render() {
    const isInFocus = this.props.display.idOpportunity === this.state.oppId ? true : false; // using store, so that we only ever have 1 in focus

    const notesField = <div>
      <Field
        name='notes'
        id='notes'
        component='textarea'
        type='text'
        placeholder='...send a note to the host'
        className='inputField' />
      <label
        className='inputLabel'
        htmlFor={'notes'}>{this.state.noteLabel}
      </label>
    </div>;

    const statusFieldPositive = <div>
      <Field
        name='status'
        id='statusPositive'
        value={this.state.positiveResponse}
        component='input'
        type='radio'
        className='inputFieldHidden'
        style={{ display: 'none', margin: 'auto' }}
        onChange={() => this.handleFormStatusChange('positive')} />
      <label
        className='inputLabel'
        htmlFor={'statusPositive'}
        style={{
          backgroundColor: this.state.formStatus === 'positive' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.state.formStatus === 'positive' ? 'white' : '#082E41'
        }}
      >{this.state.positiveLabel}</label>
    </div>;

    const statusFieldNegative = <div>
      <Field
        name='status'
        id='statusNegative'
        value={this.state.negativeResponse}
        component='input'
        type='radio'
        className='inputFieldHidden'
        style={{ display: 'none', margin: 'auto' }}
        onChange={() => this.handleFormStatusChange('negative')} />
      <label
        className='inputLabel'
        htmlFor={'statusNegative'}
        style={{
          backgroundColor: this.state.formStatus === 'negative' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.state.formStatus === 'negative' ? 'white' : '#082E41'
        }}
      >{this.state.negativeLabel}</label>
    </div>;

    const signUpForm = <div>
      <form className='opportunityResponse'
        onSubmit={this.props.handleSubmit(formValues => this.addResponse(formValues))} >
        {notesField}
        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.submitting}>{this.state.submitLabel}
          </button>
        </div>
      </form>
    </div>

    const editForm = <div>
      <form className='opportunityResponse'
        onSubmit={this.props.handleSubmit(formValues => this.editResponse(formValues))} >
        {notesField}
        {statusFieldNegative}
        {statusFieldPositive}
        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.submitting}>{this.state.submitLabel}
          </button>
        </div>
      </form>
    </div>

    const theForm = (isInFocus && this.state.isMyOpp) ? editForm :
    ( (isInFocus && !this.state.hasResponded) ? signUpForm :
      (isInFocus ? editForm : '' )
    );

    return (
      <div>
        <button 
          className='responseButton' 
          onClick={() => this.toggleOpportunity(this.state.oppId)}>
          {this.state.buttonLabel}
        </button>
        {theForm}
      </div>
    );
  }
}

export const mapStateToProps = state => {
  let notes;
  if (state.user.responses) {
    if(state.user.responses[state.display.idOpportunity]){
      notes = state.user.responses[state.display.idOpportunity].notes;
    }
  }
  return {
    user: state.user,
    display: state.display,
    enableReinitialize: true,
    initialValues: {notes}
  }
}

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'response' })
)(OpportunityResponse);
