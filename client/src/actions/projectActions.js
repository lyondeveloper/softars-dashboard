import axios from 'axios';
import {
    GET_PROJECT,
    GET_PROJECTS,
    ADD_PROJECT,
    EDIT_PROJECT,
    DELETE_PROJECT,
    GET_ERRORS,
    PROJECT_LOADING
} from './types';

//Create Project
export const addProject = (projectData, history) => async dispatch => {
    try {
        const res = await axios.post('/api/projects/create', projectData);

        history.push('/projects');

        dispatch({
            type: ADD_PROJECT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

//Get all projects
export const getProjects = () => async dispatch => {
    try {
        dispatch(loadingProject());
        const res = await axios.get('/api/projects');

        dispatch({
            type: GET_PROJECTS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    }
};

//Get project by ID
export const getProject = id => async dispatch => {
    try {
        dispatch(loadingProject());
        const res = await axios.get(`/api/projects/${id}`);

        dispatch({
            type: GET_PROJECT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: null
        });
    }
};

//Edit project
export const editProject = (id, newData) => async dispatch => {
    try {
        const res = await axios.put(`/api/projects/${id}`, newData);

        dispatch({
            type: EDIT_PROJECT,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        });
    }
};

//Delete project
export const deleteProject = id => async dispatch => {
    try {
        await axios.delete(`/api/projects/${id}`);

        dispatch({
            type: DELETE_PROJECT,
            payload: id
        });
    } catch (err) {
        const errors = {};

        errors.notAllowed = 'You are not allowed to do this';

        dispatch({
            type: GET_ERRORS,
            payload: errors
        });
    }
};

export const loadingProject = () => {
    return {
        type: PROJECT_LOADING
    };
};
