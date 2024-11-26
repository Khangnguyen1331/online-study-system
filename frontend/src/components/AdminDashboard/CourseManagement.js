// src/components/AdminDashboard/CourseManagement.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses, updateCourse } from '../../redux/actions/courseActions';

const CourseManagement = () => {
  const dispatch = useDispatch();
  const { courses, loading, error, totalPages, currentPage } = useSelector(state => state.course);
  const [searchTerm, setSearchTerm] = useState('');
  let searchTimeout;

  useEffect(() => {
    dispatch(getCourses(currentPage, searchTerm));
  }, [dispatch, currentPage, searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      dispatch(getCourses(1, value));
    }, 500);
  };

  const handlePriceUpdate = async (courseId, newPrice) => {
    try {
      await dispatch(updateCourse(courseId, { price: newPrice }));
    } catch (error) {
      console.error('Failed to update price:', error);
    }
  };

  const handlePremiumToggle = async (courseId, currentStatus) => {
    if (window.confirm(`Bạn có chắc muốn ${currentStatus ? 'hủy' : 'đặt'} khóa học này thành Premium?`)) {
      try {
        await dispatch(updateCourse(courseId, { isPremium: !currentStatus }));
      } catch (error) {
        console.error('Failed to toggle premium status:', error);
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="card">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Quản lý Khóa học</h5>
      </div>

      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm khóa học..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-primary">
                <i className="bi bi-search"></i> Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-dark text-white">
              <tr>
                <th>Tên khóa học</th>
                <th>Giảng viên</th>
                <th>Giá (VNĐ)</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {courses.map(course => (
                <tr key={course._id}>
                  <td>{course.title}</td>
                  <td>{course.instructor.name}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control form-control-sm"
                      value={course.price}
                      onChange={(e) => handlePriceUpdate(course._id, e.target.value)}
                    />
                  </td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={course.isPremium}
                        onChange={() => handlePremiumToggle(course._id, course.isPremium)}
                      />
                      <label className="form-check-label">
                        {course.isPremium ? 'Premium' : 'Free'}
                      </label>
                    </div>
                  </td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handlePriceUpdate(course._id, course.price)}
                    >
                      <i className="bi bi-save"></i> Lưu giá
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-4">
            <ul className="pagination justify-content-center">
              {[...Array(totalPages)].map((_, index) => (
                <li
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => dispatch(getCourses(index + 1, searchTerm))}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default CourseManagement;