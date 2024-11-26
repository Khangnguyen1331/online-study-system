// src/redux/reducers/adminReducer.js
import {
  ADMIN_ERROR,
  ADMIN_LOADING,
  DELETE_STUDENT_SUCCESS,
  GET_PREMIUM_STUDENTS_SUCCESS,
  GET_STATS_SUCCESS,
  GET_STUDENTS_SUCCESS,
  UPDATE_STUDENT_SUCCESS
} from '../actions/adminActions';
 
 const initialState = {
  students: [],
  premiumStudents: [],
  statistics: null,
  loading: false,
  error: null,
  currentPage: 1,
  totalPages: 1
 };
 
 const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_LOADING:
      return {
        ...state,
        loading: true,
        error: null
      };
 
    case GET_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        students: action.payload.students,
        currentPage: action.payload.currentPage,
        totalPages: action.payload.totalPages,
        error: null
      };
 
    case GET_PREMIUM_STUDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        premiumStudents: action.payload.students,
        currentPage: action.payload.currentPage, 
        totalPages: action.payload.totalPages,
        error: null
      };
 
    case GET_STATS_SUCCESS:
      return {
        ...state,
        loading: false,
        statistics: action.payload,
        error: null
      };
 
    case UPDATE_STUDENT_SUCCESS:
      const updatedStudent = action.payload;
      return {
        ...state,
        loading: false,
        // Cập nhật trong cả 2 danh sách
        students: state.students.map(student => 
          student._id === updatedStudent._id ? updatedStudent : student
        ),
        premiumStudents: state.premiumStudents.map(student =>
          student._id === updatedStudent._id ? updatedStudent : student  
        ),
        error: null
      };
 
    case DELETE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        // Xóa khỏi cả 2 danh sách
        students: state.students.filter(student => student._id !== action.payload),
        premiumStudents: state.premiumStudents.filter(student => student._id !== action.payload),
        error: null
      };
 
    case ADMIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
 
    default:
      return state;
  }
 };
 
 export default adminReducer;