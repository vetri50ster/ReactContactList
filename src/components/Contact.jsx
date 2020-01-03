import React from 'react';
import $ from 'jquery';
export default class Contact extends React.Component {
  
  constructor(props) {
    super(props);
  }
  handleClick(){
  	this.props.actions.changeSelectedContact(this.props.id);
    this.props.actions.showContactInfo();    
  }
  deleteContact(e){
    this.props.actions.deleteContact(this.props.id);
    this.props.actions.changeSelectedContact(0);
    $('#del_alert').show().delay(700).fadeOut();
    e.stopPropagation(); // Preventing selection of deleted contact by stopping propagation
  }
  editContact(e){
    this.props.actions.editContact(this.props.id);
    this.props.actions.setToEditData(this.props.contactData);
    this.props.actions.changeSelectedContact(this.props.id);    
    e.stopPropagation(); // Preventing selection of edited contact by stopping propagation
  }
  render() {
    return (
      <div>
      	<p className= {"contact " + (this.props.contactData.selected ? "active" : "")} onClick={this.handleClick.bind(this)}>{this.props.contactData.name} <span className="edit glyphicon" title="Edit Contact" onClick={this.editContact.bind(this)}>&#x270f;</span><span title="Delete Contact" className="delete glyphicon glyphicon-trash" onClick={this.deleteContact.bind(this)}></span></p>
      </div>
    )
  }
}