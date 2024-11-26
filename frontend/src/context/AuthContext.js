import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

// Tạo context
export const AuthContext = createContext();

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 

  // Kiểm tra người dùng đã đăng nhập chưa
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Gọi API để lấy thông tin người dùng
      axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {setUser(res.data.user); setLoading(false);})
      .catch(() => {
        localStorage.removeItem('token');
        setUser(null);
        setLoading(false);
      });
    }
    else{
      setLoading(false);
    }
  }, []);

  

  const login = (token, userData) => {
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
