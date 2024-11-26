// src/components/Auth/Login.js
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';  // Xóa vì không dùng
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Login = () => {
  // const dispatch = useDispatch();  // Xóa vì không dùng
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const result = await axios.post('/api/auth/login', formData);
      login(result.data.token, result.data.user);
      
      switch(result.data.user.role) {
        case 'admin':
          navigate('/admin');
          break;
        case 'instructor':
          navigate('/instructor');
          break;
        case 'student':
          if (result.data.user.isPremium) {
            navigate('/student-premium');
          } else {
            navigate('/student');
          }
          break;
        default:
          navigate('/');
      }
    } catch (err) {
      setError(err.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Đăng Nhập</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              className="form-control" 
              name="email" 
              value={email} 
              onChange={onChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật Khẩu</label>
            <input 
              type="password" 
              className="form-control" 
              name="password" 
              value={password} 
              onChange={onChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
};

export default Login;