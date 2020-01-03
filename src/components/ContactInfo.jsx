import React from 'react';
import $ from 'jquery';
class ContactInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      contacts: this.props.contactsData
    }
  }
  validate(evt){
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode( key );
    var regex = /[0-9]|\./;
    if( !regex.test(key) ) {
      theEvent.returnValue = false;
      if(theEvent.preventDefault) theEvent.preventDefault();
    }
  }
  componentDidUpdate()
	{
      let props = this.props;
      if(this.refs.nametxt !== undefined){
        this.refs.nametxt.value = props.editContactFormOpen ? props.editContactData.name : "";
        this.refs.mobiletxt.value = props.editContactFormOpen ? props.editContactData.mobile : "";
        this.refs.addresstxt.value = props.editContactFormOpen ? props.editContactData.address : "";
        this.refs.emailtxt.value = props.editContactFormOpen ? props.editContactData.email : "";
      }
	}
  handleAdd(){
    if(!this.checkValidation()){
      return false;
    }
    this.props.actions.addContact(this.generateContactData("new"));
    if(this.props.contactsData.length === 0){ // On adding 1st contact, make it a active one.
      this.props.actions.changeSelectedContact(0);
    }
    $('#add_alert').show().delay(700).fadeOut();
  }
  handleSave(){
    if(!this.checkValidation()){
      return false;
    }
    this.props.actions.saveContact(this.generateContactData("edit"));
    $('#save_alert').show().delay(700).fadeOut();
  }
  checkValidation(){
    if(document.getElementById('nametxt').value === ""){ // Name Validation
      $('#name_alert').show().delay(700).fadeOut();
      return false;
    }
    return true;
  }
  generateContactData(type){ // Json object generation for new Contact.
    var contactData = {
      "name": document.getElementById('nametxt').value,
      "mobile": document.getElementById('mobiletxt').value === "" ? "  N/A" : document.getElementById('mobiletxt').value,
      "address": document.getElementById('addresstxt').value === "" ? "  N/A" : document.getElementById('addresstxt').value,
      "email": document.getElementById('emailtxt').value === "" ? "  N/A" : document.getElementById('emailtxt').value,
      "selected": type === "new" ? false : true
    }
    return contactData;
  }
  render() {
    var props = this.props;
    var contactDetail, element;
    if(this.props.addContactFormOpen || this.props.editContactFormOpen){
      element = (
        <div className="contact-info-container form-group new-contact">
          <div><label>Name<span className='mandatory'>*</span></label><input type='text' id="nametxt" ref="nametxt" className="form-control" name='name'/></div>
          <div><label>Mobile</label><input type='text' onKeyPress={this.validate.bind(this)} className="form-control" name='mobile' maxLength="10" id="mobiletxt"  ref="mobiletxt"/></div>
          <div><label>Address</label><input type='text' className="form-control" name='address' id="addresstxt"  ref="addresstxt"/></div>
          <div><label>Email</label><input type='text' className="form-control" name='email' id="emailtxt" ref="emailtxt"/></div>
          <div className="btn-container">
            { this.props.addContactFormOpen ? 
            <button className="btn btn-success" title="Add contact" onClick={this.handleAdd.bind(this)}>Add</button>
            :
            <button className="btn btn-success save-btn" title="Add contact" onClick={this.handleSave.bind(this)}>Save</button>
            }

          </div>
        </div>
        
      )
    }
    else{
      if(this.props.contactsData.length){
        this.props.contactsData.map((contact, i) => {
          if(contact.selected){
            contactDetail = contact;
          }
        });
        element = (
        <div className="contact-info">
          <p className="name">{contactDetail.name}</p>
          <p className="mobile"><label>Mobile: </label>{contactDetail.mobile}</p>
          <p className="address"><label>Address: </label>{contactDetail.address}</p>
          <p className="email"><label>Email: </label>{contactDetail.email}</p>
        </div>
        )
      }
      else{
        return(
          <div className="contact-info-container">
            <div className="contact-info-header">
              <h1>Contact Info</h1>
            </div>
            <p className="no-info">No info available.</p>
          </div>
        )
      }
    }
    return(
      <div className="contact-info-container">
        <div className="contact-info-header">
          <h1>{ this.props.addContactFormOpen || this.props.editContactFormOpen ? (this.props.editContactFormOpen ? "Edit Contact" : "New Contact") : "Contact Info"}</h1>
        </div>
        {element}
      </div>
    )
  }
}
export default ContactInfo;
