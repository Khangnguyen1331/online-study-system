// src/redux/reducers/instructorReducer.js
import {
    CREATE_COURSE_SUCCESS,
    DELETE_COURSE_SUCCESS,
    GET_COURSES_FAIL,
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_STATS_FAIL,
    // Thêm các action mới
    GET_STATS_REQUEST,
    GET_STATS_SUCCESS,
    INSTRUCTOR_ERROR,
    UPDATE_COURSE_SUCCESS
} from '../actions/instructorActions';

const initialState = {
    courses: [],
    loading: false,
    error: null,
    statistics: null // Thêm statistics vào initialState
};

const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COURSES_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case GET_STATS_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        
        case GET_COURSES_SUCCESS:
            return {
                ...state,
                loading: false,
                courses: action.payload
            };
        
        case GET_STATS_SUCCESS:
            return {
                ...state,
                loading: false,
                statistics: action.payload
            };
        
        case CREATE_COURSE_SUCCESS:
            return {
                ...state,
                courses: [action.payload, ...state.courses],
                loading: false
            };
        
        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                courses: state.courses.map(course => 
                    course._id === action.payload._id ? action.payload : course
                ),
                loading: false
            };
        
        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                courses: state.courses.filter(course => course._id !== action.payload),
                loading: false
            };
        
        case GET_COURSES_FAIL:
        case GET_STATS_FAIL: // Xử lý lỗi cho GET_STATS_FAIL
        case INSTRUCTOR_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        
        default:
            return state;
    }
};

export default instructorReducer;
