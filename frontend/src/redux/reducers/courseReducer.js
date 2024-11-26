// src/redux/reducers/courseReducer.js
import {
    GET_COURSES_FAIL,
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    UPDATE_COURSE_SUCCESS
} from '../actions/courseActions';
  
  const initialState = {
    courses: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1
  };
  
  const courseReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_COURSES_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      case GET_COURSES_SUCCESS:
        return {
          ...state,
          loading: false,
          courses: action.payload.courses,
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages
        };
      case UPDATE_COURSE_SUCCESS:
        return {
          ...state,
          courses: state.courses.map(course => 
            course._id === action.payload._id ? action.payload : course
          )
        };
      case GET_COURSES_FAIL:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default courseReducer;