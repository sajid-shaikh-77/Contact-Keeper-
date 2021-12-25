import React, { useReducer } from "react";
import axios from "axios";
import ContactContext from "./contactContext";
import contactReducer from './contactReducer'
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_CONTACT,
    FILTER_CONTACT,
    CLEAR_FILTER,
    CONTACT_ERRORS,

} from '../types';

const ContactState = props => {
    const initialState = {
        contacts: [],
        current: null,
        filtered: null,
        error: null
    };


    const [state, dispatch] = useReducer(contactReducer, initialState)
    // Add contact

    const addContact = async contact => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        try {

            const res = await axios.post('http://localhost:5000/api/contacts', contact, config);
            dispatch({ type: ADD_CONTACT, payload: res.data })

        } catch (err) {
            dispatch({
                type: CONTACT_ERRORS,
                payload: err.respons.msg
            })
        }

    };

    // Delete contact
    const deleteContact = id => {
        dispatch({ type: DELETE_CONTACT, payload: id })
    };

    // set Current Contact 

    const setCurrent = contact => {
        dispatch({ type: SET_CURRENT, payload: contact })
    };
    // Clear Current Contact 
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    };

    // Update Contact
    const updateContact = contact => {
        dispatch({ type: UPDATE_CONTACT, payload: contact });
    };

    // Fliter Contact 
    const filterContact = text => {
        dispatch({ type: FILTER_CONTACT, payload: text });
    };


    // clear Fliter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER });
    };

    return (
        <ContactContext.Provider value={{
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
            updateContact
        }}>
            {props.children}
        </ContactContext.Provider>
    )
};

export default ContactState;