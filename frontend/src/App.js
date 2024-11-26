// src/App.js
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import CourseManagement from './components/InstructorDashboard/CourseManagement'; // Sửa đường dẫn import
import InstructorLayout from './components/InstructorDashboard/Layout';
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
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<AdminStudentsManagement />} />
            <Route path="/admin/premium-students" element={<AdminPremiumStudentsManagement />} />

            {/* Instructor Routes */}
            <Route 
              path="/instructor" 
              element={
                <InstructorLayout>
                  <InstructorDashboard />
                </InstructorLayout>
              } 
            />
            <Route 
              path="/instructor/courses" 
              element={
                <InstructorLayout>
                  <CourseManagement />
                </InstructorLayout>
              }
            />

            {/* Student Routes */}
            <Route path="/student" element={<StudentDashboard />} />
            <Route path="/student-premium" element={<StudentPremiumDashboard />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;