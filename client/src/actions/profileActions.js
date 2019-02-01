import axios from "axios";

import {
    GET_PROFILE,
    GET_PROFILES,
    LOADING,
    SET_CURRENT_USER,
    GET_ERRORS,
    CLEAR_CURRENT_PROFILE
} from "./types";

//Set Loading
export const loadingProfile = () => {
    return {
        type: LOADING
    };
};

//Add profile
export const createOrEditProfile = (profileData, history) => async dispatch => {
    try {
        await axios.post("/api/profiles/createOrEdit", profileData);

        history.push(`/dashboard`);
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

export const getCurrentProfile = () => async dispatch => {
    try {
        dispatch(loadingProfile());

        const res = await axios.get("/api/profiles/current");

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    }
};

//Get Profile By Handle
export const getProfileByHandle = handle => async dispatch => {
    try {
        dispatch(loadingProfile());

        const res = await axios.get(`/api/profiles/${handle}`);

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILE,
            payload: {}
        });
    }
};

//Get all profiles
export const getProfiles = () => async dispatch => {
    try {
        dispatch(loadingProfile());

        const res = await axios.get("/api/profiles");

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_PROFILES,
            payload: {}
        });
    }
};

export const clearCurrentProfile = () => {
    return {
        type: CLEAR_CURRENT_PROFILE
    };
};

//Delete Account
export const deleteAccount = () => async dispatch => {
    if (
        window.confirm(
            "Are you sure about this? This action can NOT be undone!"
        )
    ) {
        try {
            await axios.delete("/api/profiles");

            dispatch({
                type: SET_CURRENT_USER,
                payload: {}
            });
        } catch (err) {
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });
        }
    }
};
