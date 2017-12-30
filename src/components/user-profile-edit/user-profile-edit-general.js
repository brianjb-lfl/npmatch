import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import IndivNameFields from '../fields/name-indiv';
import OrgNameFields from '../fields/name-org';
import LocationFields from '../fields/location';
import CausesFields from '../fields/causes';
import SkillsFields from '../fields/skills';
import LinkFields from '../fields/links';

export class UserEditGeneralForm extends Component {
  constructor(props){
    super(props);
    this.state={
      links: Array.isArray(this.props.user.links) ?
        ( this.props.user.links.length > 0 ? this.props.user.links : [{linkType:'',linkUrl:''}] ) :
        [{linkType:'',linkUrl:''}],
    }
  }

  addLink() {
    const newLink = {linkType: '', linkUrl: ''}; 
    this.setState({
      links: [...this.state.links, newLink ]
    });
  }

  removeLink(index) {
    const newLinks = [...this.state.links];
    newLinks.splice(index,1); 
    this.setState({
      links: newLinks
    });
  }

  handleSubmitButton(input) {
    let links = [];
    let index = 0;
    while(index < 99){
      if (input[`linkType${index}`]) {
        links.push({
          linkType: input[`linkType${index}`],
          linkUrl: input[`linkUrl${index}`]
        })
        index += 1;
      } else {
        index = 99;
      }
    }
    const user = {...input, links, id: this.props.user.id};
    const isNew = false;
    this.props.dispatch(actionsUser.createOrEditUser(user, this.props.user.authToken, isNew))
      .then(() => {
        this.props.dispatch(actionsDisplay.changeDisplay('selfProfile'));
        this.props.history.push(`/profiles/${this.props.user.id}`)
      })
  }

  render() {

    const nameForm = this.props.user.userType === 'individual' ?
      <IndivNameFields /> : <OrgNameFields />;

    let myLinks;
      if (this.state.links.length >0) {
        myLinks = this.state.links.map((link,index)=>{
          return <div key={index} >
            <LinkFields initialValues={link} index={index}/>
            <button type='button' onClick={()=>this.removeLink(index)}>remove</button>
          </div>
        })
      } else {
        myLinks = <LinkFields index={0}/>
      }

    return (
      <form className='userProfile'
        onSubmit={this.props.handleSubmit(values => this.handleSubmitButton(values))} >

        {nameForm}

        <div>
          <label
            className='inputLabel'
            htmlFor={'bio'}>Bio
          </label>
          <Field
            name='bio'
            id='bio'
            component='input'
            type='text'
            className='inputField' />
        </div>

        <LocationFields />
        <CausesFields />
        <SkillsFields />

        <div>
          <label
            className='inputLabel'
            htmlFor={'availability'}>Availability
          </label>
          <Field
            name='availability'
            id='availability'
            component='input'
            type='text'
            className='inputField' />
        </div>

        <div>
          <label
            className='inputLabel'
            htmlFor={'logo'}>Logo URL
          </label>
          <Field
            name='logo'
            id='logo'
            component='input'
            type='text'
            className='inputField' />
        </div>

        <h6>My Links</h6>
        {myLinks}
        <button type='button' onClick={()=>this.addLink()}>add link</button>

        <div>
          <button className='submitButton'
            type="submit" disabled={this.props.pristine || this.props.submitting}>Save
          </button>
          <button className='clearFormButton'
            type="button" disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.reset}>Clear Form
          </button>
        </div>

      </form>
    );
  }
}

export const mapStateToProps = state => {
  const causes = state.user.causes ? state.user.causes : null; // so the form doesn't show [x]
  const skills = state.user.skills ? state.user.skills : null; 
  const linkObject = {}; // convert array of links to object keys to initialize variable length form
  state.user.links.forEach((link,index)=>{
    linkObject[`linkType${index}`] = link.linkType;
    linkObject[`linkUrl${index}`] = link.linkUrl;
  })
  const initialUser = {...state.user, causes, skills, ...linkObject};
  return {
    general: state.general,
    user: state.user,
    opportunity: state.opportunity,
    display: state.display.view,
    initialValues: initialUser,
    enableReinitialize: true,
  }
};

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userProfile' })
)(UserEditGeneralForm);