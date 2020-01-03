import * as types from '../constants/actionTypes'
import fetch from 'isomorphic-fetch';

export function loadAllContacts() {
    return function (dispatch, state) {
        fetch('src/json/data.json',{
                method: 'get',
                headers: {
                    'Accept': 'application/json'
                }
        })
        .then((response) => {
            if (response.status >= 400) {
            throw new Error("Bad response from server");
            }
            return response.json();
        })
        .then(data => {
            var contacts = data;
            dispatch({ type: types.SET_CONTACTS_DATA, contacts });
        })
        .catch(error => {
            return response.json();
        });
    }
}
export function changeSelectedContact(id) {
    return function(dispatch, state){
        dispatch({ type: types.CHANGE_SELECTED_CONTACT, id });
    }
}
export function showAddContactForm() {
    return function(dispatch, state){
        dispatch({ type: types.SHOW_ADD_CONTACT_FORM });
    }
}
export function showEditContactForm() {
    return function(dispatch, state){
        dispatch({ type: types.SHOW_EDIT_CONTACT_FORM });
    }
}
export function showContactInfo() {
    return function(dispatch, state){
        dispatch({ type: types.SHOW_CONTACT_INFO });
    }
}
export function addContact(contactData) {
    return function(dispatch, state){
        dispatch({ type: types.ADD_CONTACT, contactData});
    }
}
export function saveContact(contactData) {
    return function(dispatch, state){
        dispatch({ type: types.SAVE_CONTACT, contactData});
    }
}
export function setToEditData(contactData) {
    return function(dispatch, state){
        dispatch({ type: types.SET_TO_EDIT_DATA, contactData});
    }
}
export function deleteContact(id) {
    return function(dispatch, state){
        dispatch({ type: types.DELETE_CONTACT, id});
    }
}
export function editContact(id) {
    return function(dispatch, state){
        dispatch({ type: types.EDIT_CONTACT, id});
    }
}