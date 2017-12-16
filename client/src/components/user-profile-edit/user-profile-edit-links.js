import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import 'react-widgets/dist/css/react-widgets.css'

import * as actionsUser from '../../actions/user';
import LinkFields from '../fields/links';

export class UserEditLinksForm extends Component {
  
  handleSubmitButton(link, index = 0, action = 'add') {
    this.props.dispatch(actionsUser.manageLinks(this.props.user, link, index , action))
    // 2nd argument is index#, use -1 for add.
  }

  render() {

    const myLinks = this.props.user.links.map((link,index)=>{
      return <li key={index}>
        {link.linkType}{link.linkURL}
        <button onClick={()=>this.handleSubmitButton(link,index,'delete')}>Delete</button>
        <button onClick={()=>this.handleSubmitButton(link,index,'edit')}>Edit</button>
      </li>
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
  user: state.user
});

export default compose(
  connect(mapStateToProps),
  reduxForm({ form: 'userLinks' })
)(UserEditLinksForm);