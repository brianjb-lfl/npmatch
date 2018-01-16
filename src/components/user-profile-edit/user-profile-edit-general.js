import React, { Component } from 'react';
import { Switch, Redirect } from 'react-router-dom';
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
    // console.log('raw input',input)    
    const user = {...input, id: this.props.user.id};
    let links = [];
    let index = 0;
    while(index < 99){
      if (input[`linkType${index}`]) {
        links.push({
          linkType: input[`linkType${index}`],
          linkUrl: input[`linkUrl${index}`]
        })
        delete user[`linkType${index}`];
        delete user[`linkUrl${index}`];
        index += 1;
        // console.log(index, links)
      } else {
        index = 99;
      }
    }
    user.links = links;
    // console.log('after fixing links', user)
    const isNew = false;
    this.props.dispatch(actionsUser.createOrEditUser(user, this.props.user.authToken, isNew))
      .then(() => {
        this.props.dispatch(actionsDisplay.changeDisplay('selfProfile'));
        this.props.history.push(`/profiles/${this.props.user.id}`)
      })
  }

  render() {

    const redirect = this.props.user.id ? '' : <Switch><Redirect from='*' to='/' /></Switch>
    const nameForm = this.props.user.userType === 'individual' ? <IndivNameFields /> : <OrgNameFields />;

    let myLinks;
      if (this.state.links.length >0) {
        myLinks = this.state.links.map((link,index)=>{
          return <div className='labelInputPair linksContainer' key={index} >
            <LinkFields initialValues={link} index={index}/>
            <i className="fa fa-minus editLinkButton tooltip"
            aria-hidden="true"
            onClick={()=>this.removeLink(index)}>
            <div className='popover'>
              delete this link
            </div>
          </i>
          </div>
        })
      } else {
        myLinks = <LinkFields index={0}/>
      }

    return (
      <form className='previewCard spacedForm'
        onSubmit={this.props.handleSubmit(values => this.handleSubmitButton(values))} >
        {redirect}
        {nameForm}

        <div className='labelInputPair'>
          <label
            className='inputLabel'
            htmlFor={'bio'}>Bio
          </label>
          <Field
            name='bio'
            id='bio'
            component='textarea'
            placeholder='tell us all about yourself!'
            type='text'
            className='inputField' />
        </div>

        <LocationFields />
        <CausesFields />
        <SkillsFields />

        <div className='labelInputPair'>
          <label
            className='inputLabel'
            htmlFor={'availability'}>Availability
          </label>
          <Field
            name='availability'
            id='availability'
            component='input'
            placeholder='your availability to help, e.g. "Mondays from 3-5pm"'
            type='text'
            className='inputField' />
        </div>

        <div className='labelInputPair'>
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

        <div className='addLinkContainerWithHeader'>
          <h6 className='formGroupSubHeader'>My Links</h6>
          <i className="fa fa-plus editLinkButton absolutePosPlus tooltip"
            aria-hidden="true" onClick={()=>this.addLink()}>
            <div className='popover'>
              add a link
            </div>
          </i>
        </div>
        {myLinks}


        <div className='previewBottomBar'>
          <button className='clearFormButton'
            type="button" disabled={this.props.pristine || this.props.submitting}
            onClick={this.props.reset}>Reset Form
          </button>
          <button className='submitButton'
            type="submit" disabled={this.props.pristine || this.props.submitting}>Save
          </button>

        </div>

      </form>
    );
  }
}

export const mapStateToProps = state => {
  const {id, username, userType, firstName, lastName, organization, logo, locationCity, locationState, locationCountry, availability, bio} = state.user;
  const causes = state.user.causes ? state.user.causes : null; // so the form doesn't show [x]
  const skills = state.user.skills ? state.user.skills : null; 
  const linkObject = {}; // convert array of links to object keys to initialize variable length form
  state.user.links.forEach((link,index)=>{
    linkObject[`linkType${index}`] = link.linkType;
    linkObject[`linkUrl${index}`] = link.linkUrl;
  })
  const initialUser = {id, username, userType, firstName, lastName, organization, logo, locationCity, locationState, locationCountry, availability, bio, causes, skills, ...linkObject};
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