// src/redux/actions/courseActions.js
import api from '../../utils/api';

export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_FAIL = 'GET_COURSES_FAIL';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';

export const getCourses = (page = 1, search = '') => async dispatch => {
  try {
    dispatch({ type: GET_COURSES_REQUEST });
    const res = await api.get(`/api/courses?page=${page}&search=${search}`);
    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAIL,
      payload: error.response?.data.message || 'Error fetching courses'
    });
  }
};

export const updateCourse = (courseId, updateData) => async dispatch => {
  try {
    const res = await api.put(`/api/courses/${courseId}`, updateData);
    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: GET_COURSES_FAIL,
      payload: error.response?.data.message || 'Error updating course'
    });
  }
};