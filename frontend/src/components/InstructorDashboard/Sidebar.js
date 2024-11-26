// src/components/InstructorDashboard/Sidebar.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      path: '/instructor',
      label: 'Thống kê',
      icon: 'bi bi-graph-up'
    },
    {
      path: '/instructor/courses',
      label: 'Quản lý Khóa học',
      icon: 'bi bi-book'
    },
    {
      path: '/instructor/coursesVideo',
      label: 'Quản lí bài giảng video',
      icon: 'bi bi-book'
    },
    {
      path: '/instructor/coursesTheory',
      label: 'Quản lý bài giảng Lý thuyết',
      icon: 'bi bi-book'
    },
    {
      path: '/instructor/coursesStudent',
      label: 'Quản lý học viên khóa học',
      icon: 'bi bi-book'
    }
    
  ];

  return (
    <div className="bg-dark text-white" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h5 className="text-center">Instructor Panel</h5>
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