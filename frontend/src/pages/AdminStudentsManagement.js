// src/pages/AdminStudentsManagement.js
import React from 'react';
import AdminLayout from '../components/AdminDashboard/Layout';
import StudentManagement from '../components/AdminDashboard/StudentManagement';

const AdminStudentsManagement = () => {
  return (
    <AdminLayout>
      <div className="container-fluid">
        <StudentManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminStudentsManagement;