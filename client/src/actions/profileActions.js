import axios from "axios";

import {
  GET_PROFILE,
  GET_PROFILES,
  LOADING,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

//Set Loading
export const loadingProfile = () => {
  return {
    type: LOADING
  };
};

//Add profile
export const addProfile = profileData => async dispatch => {
  try {
    await axios.post("/api/profiles/createOrEdit", profileData);
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
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
      type: GET_ERRORS,
      payload: err.response.data
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
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

//Delete Account
export const deleteAccount = () => async dispatch => {
  if (
    window.confirm("Are you sure about this? This action can NOT be undone!")
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
