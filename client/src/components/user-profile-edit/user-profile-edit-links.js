import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import * as actionsDisplay from '../../actions/display';
import LinkFields from '../fields/links';

export class UserEditLinksForm extends Component {
  
  handleSubmitButton(link, index = 0, action = 'add') {
    this.props.dispatch(actionsUser.manageLinks(this.props.user, link, index, action))
  }

  handleEditButton(index, edit=false) {
    this.props.dispatch(actionsDisplay.changeDisplay('editLink'));
    this.props.dispatch(actionsUser.toggleEditLink(index, edit, this.props.user.links))
  }

  render() {

    const linkCheck = this.props.user.links[0].edit ? 'editing' : 'not editing' ;

    const myLinks = this.props.user.links.map((link,index)=>{
      console.log('link inside map',!link.edit, link.edit, link);
      if (link.edit && this.props.display.view === 'editLink') {
        console.log('editing link')
        return <li key={index}>
          <form className='userProfile'
            onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values, index, 'edit'))}
          >
            <LinkFields initialValues = {link} anotherTest = {1}/>
            <button 
              type="submit" disabled={this.props.pristine || this.props.submitting}>Save
            </button>
          </form>
        </li>
      } else {
        console.log('not editing link')
        return <li key={index}>
          <div>{link.linkType}</div>
          <div>{link.linkURL}{linkCheck}</div>
          <button onClick={()=>this.handleSubmitButton(link,index,'delete')}>Delete</button>
          <button onClick={()=>this.handleEditButton(index, true)}>Edit</button>
        </li>
      }
    })
    
    return (
      <div>
        <div>
          <h6>My Links</h6>
          <ul>
            {myLinks}
          </ul>
        </div>

        <form className='userProfile'
          onSubmit={this.props.handleSubmit((values) => this.handleSubmitButton(values))}
        >

          <LinkFields/>

          <div>
            <button 
              type="submit" disabled={this.props.pristine || this.props.submitting}>Add
            </button>
          </div>

        </form>
      </div>
    );
  }
}


export const mapStateToProps = state => ({
  user: state.user,
  display: state.display,
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userLinks' })
)(UserEditLinksForm);