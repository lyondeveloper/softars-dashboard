import {SET_CURRENT_USER, GET_ERRORS} from './types';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import setAuthToken from '../components/utils/setAuthToken';

export const registerUser = (userData, history) => async dispatch => {

    //Doing request to back-end to register user

    try {

        await axios.post('/api/users/register', userData);

        history.push('/login');

    } catch(err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }   

};
 
export const setCurrentUser = decoded => {

    //Setting the current user that has logged in

    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

export const loginUser = (userData, history) => async dispatch => {

    //Doing request to back-end to log in user

    try {
        const res = await axios.post('/api/users/login', userData);
        
        //Grabbing the token from the response and setting it up in the headers
        const {token} = res.data;
        localStorage.setItem('jwtToken', token);
        
        //Putting the token in the Authorization headers
        setAuthToken(token);

        const decoded = jwt_decode(token);

        dispatch(setCurrentUser(decoded));

        history.push('/projects');

    } catch(err) {

        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });

    }
}

export const logoutUser = () => dispatch => {

    //Removing the token when the function is called.
    
    localStorage.removeItem('jwtToken');

    setAuthToken(false);

    dispatch(setCurrentUser({}));

}