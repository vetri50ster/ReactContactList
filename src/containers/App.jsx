import React from 'react';
import 'whatwg-fetch'
import ContactsContainer from '../components/ContactsContainer.jsx';
import ContactInfo from '../components/ContactInfo.jsx';
import * as contactActions from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
class App extends React.Component {
	constructor(props) {
		super(props);
	}
	componentDidMount() {
		let {actions, contacts} = this.props;
		actions.loadAllContacts();
	}
	changeSelectedContact(selectedContactId){
		this.props.actions.changeSelectedContact(selectedContactId);
	}
	toggleAddContactForm(){
	}
   render() {
		 const { contacts, actions, addContactFormOpen, editContactFormOpen, editContactData } = this.props;
      return (
         <div className="wrapper">
				 	<div className="alert alert-danger" id="del_alert">
						<strong>Contact deleted!</strong>
					</div>
					<div className="alert alert-danger" id="name_alert">
						Please enter <strong>Name!</strong><p>Name is mandatory for the Contact.</p>
					</div>
					<div className="alert alert-success" id="save_alert">
						<strong>Contact saved successfully!</strong>
					</div>
					<div className="alert alert-info" id="add_alert">
						<strong>New contact added!</strong>
					</div>
         	<div>
            	<ContactsContainer contactsData={contacts} actions={actions} addContactFormOpen={addContactFormOpen} editContactFormOpen={editContactFormOpen}/>
            	<ContactInfo contactsData={contacts} actions={actions} addContactFormOpen={addContactFormOpen} editContactFormOpen={editContactFormOpen} editContactData={editContactData} />
          </div>
         </div>
      );
   }
}

function mapStateToProps(state) {
	return {
    contacts: state.contacts.allContacts,
		addContactFormOpen: state.contacts.addContactFormOpen,
		editContactFormOpen: state.contacts.editContactFormOpen,
		editContactData: state.contacts.editContactData
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(contactActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)