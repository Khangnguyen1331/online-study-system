// src/redux/actions/adminActions.js (File mới)

 // Por

// Action Types
export const ADMIN_LOADING = 'ADMIN_LOADING';
export const GET_STUDENTS_SUCCESS = 'GET_STUDENTS_SUCCESS';
export const GET_STATS_SUCCESS = 'GET_STATS_SUCCESS';
export const ADMIN_ERROR = 'ADMIN_ERROR';

export const UPDATE_STUDENT_SUCCESS = 'UPDATE_STUDENT_SUCCESS';
export const DELETE_STUDENT_SUCCESS = 'DELETE_STUDENT_SUCCESS';
export const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_TOTAL_PAGES = 'SET_TOTAL_PAGES';
export const TOGGLE_PREMIUM_SUCCESS = 'TOGGLE_PREMIUM_SUCCESS';
// Action Creators

// src/redux/actions/adminActions.js
// Thêm action type
export const GET_PREMIUM_STUDENTS_SUCCESS = 'GET_PREMIUM_STUDENTS_SUCCESS';

// Thêm action creator
export const getPremiumStudents = (page, search) => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOADING });
    
    const response = await fetch(`http://localhost:5000/api/admin/premium-students?page=${page}&search=${search}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch premium students');
    }

    const data = await response.json();

    dispatch({
      type: GET_PREMIUM_STUDENTS_SUCCESS,
      payload: data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.message || 'Error fetching premium students'
    });
  }
};
export const setSearchQuery = (query) => ({
  type: SET_SEARCH_QUERY,
  payload: query
});

export const setCurrentPage = (page) => ({
  type: SET_CURRENT_PAGE,
  payload: page
});

export const getStudents = () => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOADING });
    
    const res = await axios.get('/api/admin/students', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    dispatch({
      type: GET_STUDENTS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.message || 'Error fetching students'
    });
  }
};

export const getStatistics = () => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOADING });
    
    const res = await axios.get('/api/admin/statistics', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    dispatch({
      type: GET_STATS_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.message || 'Error fetching statistics'
    });
  }
};

export const updateStudentPremium = (studentId, isPremium) => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOADING });
    
    const res = await axios.put(
      `/api/admin/students/${studentId}/premium`,
      { isPremium },
      {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.message || 'Error updating student'
    });
  }
};

export const deleteStudent = (studentId) => async dispatch => {
  try {
    dispatch({ type: ADMIN_LOADING });
    
    await axios.delete(`/api/admin/students/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });

    dispatch({
      type: DELETE_STUDENT_SUCCESS,
      payload: studentId
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ERROR,
      payload: error.response?.data.message || 'Error deleting student'
    });
  }
};