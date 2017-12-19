import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';

export class OpportunityResponse extends Component {
  
  addResponse (formValues) {
    const response = {
      idOpportunity: this.props.opportunity.id,
      userId: this.props.user.id,
      notes: formValues.notes,
      responseStatus: 'offered',
      organization: this.props.opportunity.organization,
      firstName: this.props.user.firstName,
      lastName: this.props.user.lastName,
      title: this.props.opportunity.title,
    }
    this.props.dispatch(actionsUser.createOrEditResponse(response, this.props.user.authToken, true))
      .then(()=>this.props.dispatch(actionsDisplay.changeDisplay('normal')));
  }
  
  editResponse (formValues, status) {
    this.props.dispatch(actionsUser.createOrEditResponse(formValues, this.props.user.authToken, false))
      .then(()=>this.props.dispatch(actionsDisplay.changeDisplay('normal')));
  }

  render() {
    // calculate whether user has responded
    const user = this.props.user;
    const opportunity = this.props.opportunity;
    const id = opportunity.id;
    const isInFocus = this.props.display.opportunityId === id ? true : false ;
    
    let hasResponded = false;
    let initialValues = opportunity;
    if (typeof user.responses === 'object') {
      if (typeof user.responses[id]  === 'object') {
        hasResponded = true;
        initialValues.note = user.responses[id].note;
      }
    }

    const noteLabel = 'note';
    const buttonLabel = hasResponded ? 'edit' : 'add' ;
    const isMyOpportunity = opportunity.userId === user.id ? true : false ;
    const positiveLabel =  isMyOpportunity ? 'accept'   : 'confirm' ;
    const positiveAction = isMyOpportunity ? 'accepted' : 'offered' ;
    const negativeLabel =  isMyOpportunity ? 'decline'  : `sorry, can't make it`;
    const negativeAction = isMyOpportunity ? 'denied'   : 'deleted' ;
      const theField = <div>
        <Field
          name='notes'
          id='notes'
          component='input'
          type='text'
          className='inputField' />
        <label
          className='inputLabel'
          htmlFor={'notes'}>{noteLabel}
        </label>
      </div>;

      let theForm;
      if (isInFocus && !hasResponded) {
        theForm = <div>
          <form className='opportunityResponse' initialvalues={initialValues}
            onSubmit={this.props.handleSubmit(formValues => this.addResponse(formValues))}
          >
          {theField}
            <div>
              <button className='submitButton'
                type="submit" disabled={this.props.submitting}>{positiveLabel}
              </button>
            </div>
          </form>
        </div> 
      } else if (isInFocus){
        theForm = <div>
          <form className='opportunityResponse' initialvalues={initialValues}
            onSubmit={this.props.handleSubmit(formValues => this.editResponse(formValues, positiveAction))}
          >
            {theField}
            <div>
              <button className='submitButton'
                type="submit" disabled={this.props.submitting}>{positiveLabel}
              </button>
              <button className='submitButton'
                onClick={(formValues)=>this.editResponse(formValues, negativeAction)}>{negativeLabel}
              </button>
            </div>
          </form>
        </div>
      }

    return (
      <div>
        <button onClick={()=>this.props.dispatch(actionsDisplay.toggleOpportunity(opportunity.id))}>{buttonLabel}</button>
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
  reduxForm({ form: 'response' })
)(OpportunityResponse);
