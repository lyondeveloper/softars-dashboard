import {
  GET_PROFILE,
  GET_PROFILES,
  LOADING,
  CLEAR_CURRENT_PROFILE
} from "../actions/types";

const initialState = {
  profiles: [],
  profile: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      };

    case GET_PROFILE:
      return {
        ...state,
        profile: action.payload,
        loading: false
      };

    case GET_PROFILES:
      return {
        ...state,
        profiles: action.payload,
        loading: false
      };

    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: {}
      };

    default:
      return state;
  }
}