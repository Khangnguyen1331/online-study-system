// src/components/AdminDashboard/Sidebar.js
import React from 'react';

import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/admin',
      label: 'Thống kê',
      icon: 'bi bi-graph-up'
    },
    {
      path: '/admin/students',
      label: 'Quản lý Sinh viên',
      icon: 'bi bi-people'
    },
    {
      path: '/admin/premium-students',
      label: 'Quản lý SV Premium',
      icon: 'bi bi-star-fill'
    },
    {
      path: '/admin/courses',
      label: 'Quản lý Khóa học',
      icon: 'bi bi-book'
    }
  ];

  return (
    <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="text-center">Admin Panel</h5>
      </div>
      <div className="list-group list-group-flush">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`list-group-item list-group-item-action ${
              location.pathname === item.path ? 'active' : ''
            }`}
          >
            <i className={`${item.icon} me-2`}></i>
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;