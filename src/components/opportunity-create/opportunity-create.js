import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import DropdownList from 'react-widgets/lib/DropdownList'
import * as actionsOpportunity from '../../actions/opportunity';
import * as helpers from '../../actions/helpers';
import * as actionsDisplay from '../../actions/display';
import LocationFields from '../fields/location';
import CausesFields from '../fields/causes';
import DateTime from '../fields/datetime';

export class OpportunityCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offer: props.opportunity.offer,
    }
  }

  handleOfferTypeChange(value) {
    this.setState({
      offer: value,
    })
  }

  handleSubmitButton(input, isNew) {
    const opp = { ...input };
    const timestampStart = this.props.opportunity.newTimestampStart || opp.timestampStart;
    const timestampEnd = this.props.opportunity.newTimestampEnd || opp.timestampEnd;
    opp.timestampStart = helpers.convertTimeStampToString(timestampStart);
    opp.timestampEnd = helpers.convertTimeStampToString(timestampEnd);
    console.log('before',input.timestampStart, 'after', opp.timestampStart)
    opp.userId = isNew ? this.props.user.id : opp.userId;
    this.props.dispatch(actionsOpportunity.createOpportunity(opp, this.props.user.authToken, isNew))
      .then(() => {
        this.props.dispatch(actionsDisplay.setOpportunity(null));
        this.props.history.push('/myopportunities');
        window.scrollTo(0, 0);
      });
  }

  render() {

    const redirect = this.props.user.id ? '' :
      <Switch><Redirect from='*' to='/' /></Switch>

    const isNew = this.props.opportunity.id ? false : true;
    const submitLabel = isNew ? 'Post Opportunity' : 'Update Opportunity';

    const renderDropdownList = ({ input, data, valueField, textField }) =>
      <DropdownList {...input}
        data={data}
        valueField={valueField}
        textField={textField}
        onChange={input.onChange} />

    const offerButtonClassName = this.state.offer ? 'selectedOptionLabel' : 'deSelectedOptionLabel' ;
    const requestButtonClassName = this.state.offer ? 'deSelectedOptionLabel' : 'selectedOptionLabel' ;

    let start, end;
    if (this.props.opportunity.newTimestampStart) {
      start = helpers.printDateAsString(this.props.opportunity.newTimestampStart);
    } else if (this.props.opportunity.timestampStart) {
      start = helpers.printDateAsString(this.props.opportunity.timestampStart);
    } else {
      start = 'no start date selected';
    }
    if (this.props.opportunity.newTimestampEnd) {
      end = helpers.printDateAsString(this.props.opportunity.newTimestampEnd);
    } else if (this.props.opportunity.timestampEnd) {
      end = helpers.printDateAsString(this.props.opportunity.timestampEnd);
    } else {
      end = 'no end date selected';
    }

    return (
      <main>
        {redirect}
        <h2 className='sectionTitle'>Opportunity</h2>
          <form className='previewCard spacedForm'
            onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values, isNew))}>
  
            <div className='selectOptionButtonContainer'>
              <div className='labelInputPair'>
                <label
                  className={offerButtonClassName}
                  htmlFor={'offerTrue'}
                >Offer to contribute
                </label>
                <Field
                  name='offer'
                  id='offerTrue'
                  style={{ display: 'none', margin: 'auto' }}
                  component='input'
                  type='radio'
                  value={true}
                  className='inputField'
                  onChange={() => this.handleOfferTypeChange(true)} />
              </div>

              <div className='labelInputPair'>
                <label
                  className={requestButtonClassName}
                  htmlFor={'offerFalse'}
                >Request for volunteers
              </label>
                <Field
                  name='offer'
                  id='offerFalse'
                  style={{ display: 'none', margin: 'auto' }}
                  component='input'
                  type='radio'
                  value={false}
                  className='inputField'
                  onChange={() => this.handleOfferTypeChange(false)} />
              </div>
            </div>

            <div className='labelInputPair'>
              <label
                className='inputLabel'
                htmlFor={'title'}>Title
            </label>
              <Field
                name='title'
                id='title'
                component='input'
                type='text'
                className='inputField'
                placeholder='name of event'
                required />
            </div>

            <div className='labelInputPair'>
              <label
                className='inputLabel'
                htmlFor={'narrative'}>Description
            </label>
              <Field
                name='narrative'
                id='narrative'
                component='textarea'
                type='text'
                className='inputField'
                placeholder='tell us all about your opportunity'
                required />
            </div>

            <div className='labelInputPair'>
              <label
                className='inputLabel'
                htmlFor={'opportunityType'}>Type
            </label>
              <Field
                name='opportunityType'
                id='opportunityType'
                component={renderDropdownList}
                data={this.props.general.oppTypes}
                textField='type'
                valueField='type'
                className='inputField'
                required />
            </div>

            <CausesFields />
            <LocationFields />

            <div className='labelInputPair'>
              <label
                className='inputLabel'
                htmlFor={'link'}>URL
            </label>
              <Field
                name='link'
                id='link'
                component='input'
                type='text'
                placeholder='opportunity-specific URL (if any)'
                className='inputField' />
            </div>

            <div className='datetimepickerRow'>
              <DateTime type='start' />
              <div className='datetimeDisplayContainer'>
                <p className='datetimeDisplay'>{start}</p>
              </div>
            </div>

            <div className='datetimepickerRow'>
              <DateTime type='end' />
              <div className='datetimeDisplayContainer'>
                <p className='datetimeDisplay'>{end}</p>
              </div>
            </div>

            <div className='previewBottomBar'>
              <button className='clearFormButton'
                type="button" disabled={this.props.pristine || this.props.submitting}
                onClick={this.props.reset}>Reset
              </button>
              <button className='submitButton'
                type="submit" disabled={this.props.pristine || this.props.submitting}>{submitLabel}
              </button>
            </div>

          </form>
      </main>
    );
  }
}


export const mapStateToProps = state => {

  const selector = formValueSelector('opportunityCreate')

  const initialForm = { ...state.opportunity }
  delete initialForm.responses;
  delete initialForm.organization;
  initialForm.userId = initialForm.userId ? initialForm.userId : state.user.id;
  initialForm.causes = initialForm.causes ? initialForm.causes : null;

  return {
    general: state.general,
    user: state.user,
    opportunity: state.opportunity,
    display: state.display,
    initialValues: initialForm,
    timestampStart: selector(state, 'timestampStart'),
    timestampEnd: selector(state, 'timestampEnd'),
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'opportunityCreate' })
)(OpportunityCreate);