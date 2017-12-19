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
    this.props.dispatch(actionsUser.createOrEditResponse(response, -1, this.props.user.authToken, true))
      .then(()=>this.props.dispatch(actionsDisplay.changeDisplay('normal')));
  }
    
    // formValues.status === 'offered' || 'deleted' ==> available to respondants
    // formValues.status === 'accepted' || 'denied' ==> available to posters
    // control availability via React component
  
  editResponse (response, index) {
    this.props.dispatch(actionsUser.createOrEditResponse(response, index, this.props.user.authToken, false))
      .then(()=>this.props.dispatch(actionsDisplay.changeDisplay('normal')));
  }

  render() {
    const noteLabel = 'note';
    const buttonLabel = 'add';
    const submitLabel = 'confirm';

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
      if (this.props.display.opportunityId === this.props.opportunity.id ) {
        theForm = <div>
          <form className='opportunityResponse' initialValues={this.props.opportunity}
            onSubmit={this.props.handleSubmit(formValues => this.addResponse(formValues))}
          >
          { theField}
            <div>
              <button className='submitButton'
                type="submit" disabled={this.props.submitting}>{submitLabel}
              </button>
            </div>
          </form>
        </div> 
      } else if (false){
        theForm = <div>
          <form className='opportunityResponse' initialValues={this.props.opportunity}
            onSubmit={this.props.handleSubmit(formValues => this.editResponse(formValues, this.props.index))}
          >
            {theField}
            <div>
              <button className='submitButton'
                type="submit" disabled={this.props.submitting}>{submitLabel}
              </button>
            </div>
          </form>
        </div>
      }

    return (
      <div>
        <button onClick={()=>this.props.dispatch(actionsDisplay.toggleOpportunity(this.props.opportunity.id))}>{buttonLabel}</button>
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
