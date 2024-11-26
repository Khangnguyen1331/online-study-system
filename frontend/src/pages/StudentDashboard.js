// src/pages/InstructorDashboard.js
import React from 'react';
import CourseManagement from '../components/InstructorDashboard/CourseManagement';
import InstructorLayout from '../components/InstructorDashboard/Layout';

const InstructorDashboard = () => {
  return (
    <InstructorLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Dashboard Giảng Viên</h2>
        <CourseManagement />
      </div>
    </InstructorLayout>
  );
};

export default InstructorDashboard;