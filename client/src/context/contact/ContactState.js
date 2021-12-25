import React, { useReducer } from 'react';
import axios from 'axios';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
  ADD_CONTACT,
  GET_CONTACTS,
  CLEAR_CONTACTS,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACT,
  CLEAR_FILTER,
  CONTACT_ERRORS
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null
  };

  const [state, dispatch] = useReducer(contactReducer, initialState);
  // Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      dispatch({ type: GET_CONTACTS, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Add contact

  const addContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.post(
        'http://localhost:5000/api/contacts',
        contact,
        config
      );
      dispatch({ type: ADD_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contacts/${id}`);
      dispatch({ type: DELETE_CONTACT, payload: id });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };

  // Clear Contacts
  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS });
  };

  // set Current Contact

  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };

  // Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      const res = await axios.put(
        `http://localhost:5000/api/contacts/${contact._id}`,
        contact,
        config
      );
      dispatch({ type: UPDATE_CONTACT, payload: res.data });
    } catch (err) {
      dispatch({
        type: CONTACT_ERRORS,
        payload: err.response.msg
      });
    }
  };
  // Fliter Contact
  const filterContact = (text) => {
    dispatch({ type: FILTER_CONTACT, payload: text });
  };

  // clear Fliter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        filterContact,
        clearFilter,
        clearCurrent,
        clearContacts,
        updateContact,
        getContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
