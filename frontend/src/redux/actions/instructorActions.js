// src/redux/actions/instructorActions.js
import axios from 'axios';

export const GET_COURSES_REQUEST = 'GET_COURSES_REQUEST';
export const GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS';
export const GET_COURSES_FAIL = 'GET_COURSES_FAIL';
export const CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS';
export const UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS';
export const DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS';
export const INSTRUCTOR_ERROR = 'INSTRUCTOR_ERROR';
// Thêm vào src/redux/actions/instructorActions.js
export const GET_STATS_REQUEST = 'GET_STATS_REQUEST';
export const GET_STATS_SUCCESS = 'GET_STATS_SUCCESS';
export const GET_STATS_FAIL = 'GET_STATS_FAIL';


// Trong file instructorActions.js thêm:
export const deleteInstructorCourse = (courseId) => async dispatch => {
    try {
      const config = {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      };
  
      await axios.delete(`/api/instructor/courses/${courseId}`, config);
  
      dispatch({
        type: DELETE_COURSE_SUCCESS,
        payload: courseId
      });
    } catch (error) {
      dispatch({
        type: INSTRUCTOR_ERROR,
        payload: error.response?.data.message || 'Error deleting course'
      });
    }
  };
export const getInstructorStats = () => async dispatch => {
  try {
    dispatch({ type: GET_STATS_REQUEST });

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    const response = await axios.get('/api/instructor/statistics', config);

    dispatch({
      type: GET_STATS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: GET_STATS_FAIL,
      payload: error.response?.data.message || 'Error fetching statistics'
    });
  }
};

// Lấy danh sách khóa học
export const getInstructorCourses = () => async dispatch => {
  try {
    dispatch({ type: GET_COURSES_REQUEST });

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    const response = await axios.get('/api/instructor/courses', config);

    dispatch({
      type: GET_COURSES_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: error.response?.data.message || 'Error fetching courses'
    });
  }
};

// Tạo khóa học mới
export const createCourse = (courseData) => async dispatch => {
  try {
    const formData = new FormData();
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.post('/api/instructor/courses', formData, config);

    dispatch({
      type: CREATE_COURSE_SUCCESS,
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: error.response?.data.message || 'Error creating course'
    });
    throw error;
  }
};

// Cập nhật khóa học
export const updateCourse = (courseId, courseData) => async dispatch => {
  try {
    const formData = new FormData();
    for (const key in courseData) {
      formData.append(key, courseData[key]);
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'multipart/form-data'
      }
    };

    const response = await axios.put(`/api/instructor/courses/${courseId}`, formData, config);

    dispatch({
      type: UPDATE_COURSE_SUCCESS,
      payload: response.data
    });

    return response.data;
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: error.response?.data.message || 'Error updating course'
    });
    throw error;
  }
};

// Xóa khóa học
export const deleteCourse = (courseId) => async dispatch => {
  try {
    const config = {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    };

    await axios.delete(`/api/instructor/courses/${courseId}`, config);

    dispatch({
      type: DELETE_COURSE_SUCCESS,
      payload: courseId
    });
  } catch (error) {
    dispatch({
      type: INSTRUCTOR_ERROR,
      payload: error.response?.data.message || 'Error deleting course'
    });
  }
};