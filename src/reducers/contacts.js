import * as types from '../constants/actionTypes'

const initialState = {
  allContacts:[],
  addContactFormOpen: false,
  editContactFormOpen: false,
  editContactData: {},
  editContactId: null
 };

export default function contacts(state = initialState, action) {
  
  switch (action.type) {
    case types.SET_CONTACTS_DATA:
      return Object.assign({}, state, {allContacts : action.contacts});

    case types.CHANGE_SELECTED_CONTACT:
      var allcontacts = state.allContacts.map( (contact, index) => {
        return index === action.id ? Object.assign({}, contact, { selected: true}) : Object.assign({}, contact, { selected: false})
      });
      return Object.assign({}, state, {allContacts : allcontacts});

    case types.SHOW_ADD_CONTACT_FORM:
      return Object.assign({}, state, {addContactFormOpen : true, editContactFormOpen: false});

    case types.SHOW_EDIT_CONTACT_FORM:
      return Object.assign({}, state, {editContactFormOpen: true, addContactFormOpen : false});

    case types.SHOW_CONTACT_INFO:
      return Object.assign({}, state, {editContactFormOpen: false, addContactFormOpen : false});

    case types.ADD_CONTACT:
      return Object.assign(
        {}, state, 
        {
          allContacts : [
            ...state.allContacts,
            action.contactData
          ],
          addContactFormOpen : false
        });

    case types.DELETE_CONTACT:
      let allcontacts = state.allContacts.filter((contact, index) =>{
          return index != action.id;
      })
      return Object.assign({}, state, {allContacts : allcontacts});

    case types.EDIT_CONTACT:
      return Object.assign({}, state, {editContactFormOpen : true, editContactId : action.id, addContactFormOpen : false});

    case types.SAVE_CONTACT:
      let allContacts = state.allContacts.map( (contact, index) => {
        return index === state.editContactId ? Object.assign({}, contact, action.contactData) : contact;
      });
      return Object.assign({}, state, {allContacts : allContacts, editContactFormOpen: false});
    case types.SET_TO_EDIT_DATA:
      return Object.assign({}, state, {editContactData : action.contactData});
      
    default:
      return state;
  }
}
