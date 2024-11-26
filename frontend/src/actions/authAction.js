import axios from 'axios';

// Đăng ký người dùng
export const register = (userData) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/register', userData);

    dispatch({
      type: 'REGISTER_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'REGISTER_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Đăng nhập người dùng
export const login = (credentials) => async (dispatch) => {
  try {
    const res = await axios.post('/api/auth/login', credentials);

    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: 'LOGIN_FAIL',
      payload: error.response.data.message,
    });
  }
};

// Đăng xuất người dùng
export const logout = () => (dispatch) => {
  dispatch({ type: 'LOGOUT' });
};
