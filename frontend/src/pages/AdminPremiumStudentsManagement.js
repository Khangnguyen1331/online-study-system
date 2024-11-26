// src/pages/AdminPremiumStudentsManagement.js
import React from 'react';
import AdminLayout from '../components/AdminDashboard/Layout';
import PremiumStudentManagement from '../components/AdminDashboard/PremiumStudentManagement';

const AdminPremiumStudentsManagement = () => {
  return (
    <AdminLayout>
      <div className="container-fluid">
        <PremiumStudentManagement />
      </div>
    </AdminLayout>
  );
};

export default AdminPremiumStudentsManagement;