import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const [error, setError] = useState('');

  const { name, email, phone, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/register', formData);
      login(res.data.token, res.data.user);
      navigate('/'); // Chuyển hướng đến trang chủ hoặc dashboard
    } catch (err) {
      setError(err.response.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Đăng Ký</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <label className="form-label">Họ Tên</label>
            <input 
              type="text" 
              className="form-control" 
              name="name" 
              value={name} 
              onChange={onChange} 
              required 
            />
          </div>
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
            <label className="form-label">Số Điện Thoại</label>
            <input 
              type="text" 
              className="form-control" 
              name="phone" 
              value={phone} 
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
          <button type="submit" className="btn btn-primary">Đăng Ký</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
