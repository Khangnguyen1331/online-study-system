// src/components/InstructorDashboard/Layout.js
import React from 'react';
import Sidebar from './Sidebar';

const InstructorLayout = ({ children }) => {
  return (
    <div className="d-flex h-100">
      <Sidebar />
      <main className="flex-grow-1 p-4">
        {children}
      </main>
    </div>
  );
};

export default InstructorLayout;