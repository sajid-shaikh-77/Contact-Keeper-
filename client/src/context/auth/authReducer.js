import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types'

const alertReducer = (state, action) => {
    switch (action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload

            }
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading: false

            }
        case REGISTER_FAIL:
            return {
                ...state,
            }
        case AUTH_ERROR:
            return {
                ...state,
            }
        case LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuthenticated: false,
                loading: false,
                user: null,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}
export default alertReducer;