// src/components/AdminDashboard/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;