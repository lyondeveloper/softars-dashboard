import {
  ADD_PROJECT,
  EDIT_PROJECT,
  GET_PROJECTS,
  GET_PROJECT,
  DELETE_PROJECT
} from "../actions/types";

const initialState = {
  projects: [],
  project: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT:
      return {
        ...state,
        project: action.payload
      };

    case GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      };

    case ADD_PROJECT:
      return {
        ...state,
        projects: [action.payload, ...state.projects]
      };
    // case EDIT_PROJECT:
    //     return {
    //         ...state,
    //         projects: state.projects.map(project => project._id === action.payload ? projects = action.payload : projects)
    //     }
    case DELETE_PROJECT:
      return {
        ...state,
        projects: state.projects.filter(
          project => project._id !== action.payload
        )
      };
    default:
      return state;
  }
}
