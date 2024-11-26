// src/components/InstructorDashboard/CourseManagement.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteInstructorCourse, getInstructorCourses } from '../../redux/actions/instructorActions';
import CourseForm from './CourseForm';



const CourseManagement = () => {
  const dispatch = useDispatch();
  const { courses, error } = useSelector(state => state.instructor);
  const [showForm, setShowForm] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(getInstructorCourses());
  }, [dispatch]);

  const handleDelete = (courseId) => {
    if (window.confirm('Bạn có chắc muốn xóa khóa học này?')) {
      dispatch(deleteInstructorCourse(courseId));
    }
  };

  return (
    <div className="container-fluid p-4">
      <h2 className="mb-4">Quản lý Khóa học</h2>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <CourseForm
          course={editCourse}
          onClose={() => {
            setShowForm(false);
            setEditCourse(null);
          }}
        />
      )}

      <div className="card">
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Tìm kiếm khóa học..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary">
                  <i className="bi bi-search"></i> Tìm kiếm
                </button>
              </div>
            </div>
            <div className="col-md-6 text-end">
              <button
                className="btn btn-success"
                onClick={() => {
                  setEditCourse(null);
                  setShowForm(true);
                }}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Thêm khóa học mới
              </button>
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="bg-dark text-white">
                <tr>
                  <th>Tên khóa học</th>
                  <th>Mô tả</th>
                  <th>Danh mục </th>
                  <th>Khóa học Premium</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((course) => (
                  <tr key={course._id}>
                    <td>{course.title}</td>
                    <td>{course.instructor?.name}</td>
                    <td>{course.price?.toLocaleString()}</td>
                    <td>
                      <span className={`badge ${course.isPremium ? 'bg-warning' : 'bg-success'}`}>
                        {course.isPremium ? 'Premium' : 'Free'}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        onClick={() => {
                          setEditCourse(course);
                          setShowForm(true);
                        }}
                      >
                        <i className="bi bi-pencil"></i> Sửa
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(course._id)}
                      >
                        <i className="bi bi-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;