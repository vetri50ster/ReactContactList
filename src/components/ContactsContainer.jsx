import React from 'react';
import Contact from './Contact.jsx';
export default class ContactsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: this.props.contactsData
    }
  }
  handleClick(){
    let props = this.props;
    if(props.addContactFormOpen || props.editContactFormOpen){
      props.actions.showContactInfo();
    }
    else{
      props.actions.showAddContactForm();
    }
  }
  render() {
    var contacts = this.props.contactsData.map( (contactData, i) => {
        return <Contact  key={i} id={i} actions={this.props.actions} contactData={contactData} />
    });
    if(this.props.contactsData.length === 0){
      contacts = <section><p>Hurray! You have no Contacts.</p><p>Add more by clicking <span className="font-bold">+</span> button</p></section>
    }
    return (
      <div className="contact-container">
      	<div className="contact-container-header">
      		<h1>Contacts</h1>
      	</div>
        <div className="contacts-wrapper">
          {contacts}
        </div>
        <div className="contact-container-footer">
              <button className="btn btn-primary" title={ this.props.addContactFormOpen || this.props.editContactFormOpen ? "Contact Info" : "Add new contact"} onClick={ this.handleClick.bind(this) }>{ this.props.addContactFormOpen || this.props.editContactFormOpen ? "i" : "+"}</button>
        </div>
      </div>
    );
  }
}