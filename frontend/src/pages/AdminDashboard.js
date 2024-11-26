// src/pages/AdminDashboard.js
import React from 'react';
import AdminLayout from '../components/AdminDashboard/Layout';
import Statistics from '../components/AdminDashboard/Statistics';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="container-fluid">
        <h2 className="mb-4">Admin Dashboard</h2>
        <Statistics />
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;