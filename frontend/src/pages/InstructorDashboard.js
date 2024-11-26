// src/pages/InstructorDashboard.js
import React from 'react';
import Statistics from '../components/InstructorDashboard/Statistics';

// Loại bỏ import Layout vì Layout đã được wrap trong App.js
const InstructorDashboard = () => {
  return (
    // Loại bỏ InstructorLayout ở đây vì đã được wrap trong App.js
    <div className="container-fluid">
      <h2 className="mb-4">Dashboard Giảng Viên</h2>
      <Statistics />
    </div>
  );
};

export default InstructorDashboard;