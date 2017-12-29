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
    }
  };

  componentDidMount() {
    if (this.props.response) { // response is injected from UserProfile
      this.setState({ response: this.props.response })
    }
    else if (this.state.hasResponded) {
      this.setState({
        response: {
          id: this.props.user.responses[this.state.oppId].id,
          idOpportunity: this.state.oppId,
          userId: this.props.user.id,
          notes: this.props.user.responses[this.state.oppId].notes,
          responseStatus: this.props.user.responses[this.state.oppId].responseStatus
        }
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
    const newResponse = {...this.response, notes: formValues.notes };
    this.props.dispatch(actionsUser.createOrEditResponse(newResponse, this.props.user.authToken, true))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(null))
        const newId = this.props.display.latestResponse;
        this.setState({
          response: {...newResponse, id: newId}
        });
      });
  }

  editResponse(formValues, status) {
    const newResponse = {...this.state.response, notes: formValues.notes, responseStatus: formValues.status};
    console.log('response in method', this.response);
    this.props.dispatch(actionsUser.createOrEditResponse(newResponse, this.props.user.authToken, false))
      .then(() => {
        this.props.dispatch(actionsDisplay.toggleOpportunity(null));
        this.setState({
          response: newResponse
        });      
      });
  }

  handleFormStatusChange(formStatus) {
    this.setState({
      formStatus
    });
  }

  toggleOpportunity(id, formStatus) {
    this.props.dispatch(actionsDisplay.toggleOpportunity(id));
    this.setState({
      formStatus
    }); // 'positive' or 'negative'
  }

  render() {
    const containerDivClass = this.props.response ? 'responsePreview' : 'responseButton' ; // preview class if formatted like a preview
    const opportunityPreview = this.props.response ? this.props.response.title : '' ; // preview for user profile
    const isInFocus = this.props.display.opportunityId === this.state.oppId ? true : false; // using store, so that we only ever have 1 in focus
    const hasResponded = this.props.response || this.props.user.responses[this.state.oppId] ? true : false ;
    // console.log('id', this.state.oppId, 'hasres', this.state.hasResponded, 'focus', isInFocus, 'mine', this.state.isMyOpp)

    const noteLabel = 'note';
    let buttonLabel = 'Signup';
    if (this.props.response) {
      buttonLabel = this.props.response.responseStatus; // clean this up
    } else if (hasResponded && !this.state.isMyOpp) {
      buttonLabel =  `You're signed up!`;
    } else if (this.state.isMyOpp) {
      buttonLabel = 'This is your project!';
    }
    const submitLabel =    hasResponded       ? `Confirm change`    : 'Confirm';
    const positiveLabel =  this.state.isMyOpp ? 'accept'            : `I'm going!`;
    const positiveAction = this.state.isMyOpp ? 'accepted'          : 'offered';
    const negativeLabel =  this.state.isMyOpp ? 'decline'           : `Sorry, I can't make it`;
    const negativeAction = this.state.isMyOpp ? 'denied'            : 'deleted';

    const notesField = <div>
      <Field
        name='notes'
        id='notes'
        component='textarea'
        type='text'
        placeholder='...send a note to the host'
        value={this.state.response.notes}
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
          backgroundColor: this.state.formStatus === 'positive' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.state.formStatus === 'positive' ? 'white' : '#082E41'
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
          backgroundColor: this.state.formStatus === 'negative' ? '#DA2536' : 'rgba(8, 46, 65, 0.1)',
          color: this.state.formStatus === 'negative' ? 'white' : '#082E41'
        }}
      >{negativeLabel}</label>
    </div>;

    // const formHeader = <div>
    //   <p>My opportunity: {this.state.isMyOpp.toString()} I have responded: {hasResponded.toString()}</p>
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
    if (isInFocus && this.state.isMyOpp) {
      theForm = editForm;
    } else if (isInFocus && !hasResponded) {
      theForm = signUpForm;
    } else if (isInFocus) {
      theForm = editForm;
    }

    // add to return a preview format
    return (
      <div className={containerDivClass}>
        <button 
          className='responseButton' 
          onClick={() => this.toggleOpportunity(this.state.oppId, this.state.response.responseStatus)}>
          {buttonLabel}
        </button>
        {opportunityPreview}
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
