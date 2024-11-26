// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CourseManagement from './components/AdminDashboard/CourseManagement';
import AdminLayout from './components/AdminDashboard/Layout';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/Layout/Navbar';
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from './pages/AdminDashboard';
import AdminPremiumStudentsManagement from './pages/AdminPremiumStudentsManagement';
import AdminStudentsManagement from './pages/AdminStudentsManagement';
import InstructorDashboard from './pages/InstructorDashboard';
import StudentDashboard from './pages/StudentDashboard';
import StudentPremiumDashboard from './pages/StudentPremiumDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container-fluid mt-4">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<AdminStudentsManagement />} />
            <Route path="/admin/premium-students" element={<AdminPremiumStudentsManagement />} />
            <Route path="/admin/courses" element={
              <AdminLayout>
                <CourseManagement />
              </AdminLayout>
            } />
            <Route path="/instructor" element={<InstructorDashboard />} />
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student-premium" element={<StudentPremiumDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;