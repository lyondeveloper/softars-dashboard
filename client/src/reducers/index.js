import { combineReducers } from "redux";
import authReducer from "./authReducer";
import projectReducer from "./projectReducer";
import profileReducer from "./profileReducer";
import errorReducer from "./errorReducer";

export default combineReducers({
  auth: authReducer,
  projects: projectReducer,
  profiles: profileReducer,
  errors: errorReducer
});
