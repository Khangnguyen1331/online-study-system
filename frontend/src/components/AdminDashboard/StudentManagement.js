// src/components/AdminDashboard/StudentManagement.js
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteStudent,
  getStudents,
  setCurrentPage,
  updateStudentPremium
} from '../../redux/actions/adminActions';

const StudentManagement = () => {
  const dispatch = useDispatch();
  const { students, loading, totalPages, currentPage, error } = useSelector(state => state.admin);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);
  let searchTimeout;

  useEffect(() => {
    dispatch(getStudents(currentPage, searchTerm));
  }, [dispatch, currentPage, searchTerm]);

  // Xử lý tìm kiếm với debounce
  const handleSearch = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchTerm(value);
    if (searchTimeout) clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      dispatch(getStudents(1, value));
    }, 500);
  };

  // Xử lý chọn nhiều sinh viên
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedStudents(students.map(s => s._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handleSelectOne = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(selectedStudents.filter(id => id !== studentId));
    } else {
      setSelectedStudents([...selectedStudents, studentId]);
    }
  };

  // Xử lý xóa sinh viên
  const handleDelete = (studentId) => {
    if (window.confirm('Bạn có chắc muốn xóa sinh viên này?')) {
      dispatch(deleteStudent(studentId));
    }
  };

  // Xử lý xóa nhiều sinh viên
  const handleBulkDelete = () => {
    if (window.confirm(`Bạn có chắc muốn xóa ${selectedStudents.length} sinh viên đã chọn?`)) {
      selectedStudents.forEach(id => dispatch(deleteStudent(id)));
      setSelectedStudents([]);
    }
  };

  // Xử lý chuyển đổi Premium
  const handlePremiumToggle = (studentId, currentStatus) => {
    if (window.confirm(`Bạn có chắc muốn ${currentStatus ? 'hủy' : 'nâng cấp'} tài khoản này thành Premium?`)) {
      dispatch(updateStudentPremium(studentId, !currentStatus));
    }
  };

  if (loading) return <div className="text-center my-3">
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>;

  return (
    <div className="card">
      <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Quản lý Sinh viên Thường</h5>
        {selectedStudents.length > 0 && (
          <button 
            className="btn btn-danger btn-sm"
            onClick={handleBulkDelete}
          >
            Xóa {selectedStudents.length} sinh viên đã chọn
          </button>
        )}
      </div>

      <div className="card-body">
        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Search */}
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Tìm kiếm theo tên, email hoặc số điện thoại..."
                value={searchTerm}
                onChange={handleSearch}
              />
              <button className="btn btn-primary">
                <i className="bi bi-search"></i> Tìm kiếm
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="bg-dark text-white">
              <tr>
                <th>
                  <input
                    type="checkbox"
                    checked={selectedStudents.length === students.length}
                    onChange={handleSelectAll}
                    className="form-check-input"
                  />
                </th>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Số điện thoại</th>
                <th>Ngày tạo</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, index) => (
                <tr key={student._id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedStudents.includes(student._id)}
                      onChange={() => handleSelectOne(student._id)}
                      className="form-check-input"
                    />
                  </td>
                  <td>{(currentPage - 1) * 8 + index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.phone}</td>
                  <td>{new Date(student.createdAt).toLocaleDateString()}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={student.isPremium}
                        onChange={() => handlePremiumToggle(student._id, student.isPremium)}
                      />
                      <label className="form-check-label">
                        {student.isPremium ? 'Premium' : 'Regular'}
                      </label>
                    </div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(student._id)}
                        title="Xóa"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => handlePremiumToggle(student._id, student.isPremium)}
                        title={student.isPremium ? 'Hủy Premium' : 'Nâng cấp Premium'}
                      >
                        <i className={`bi bi-star${student.isPremium ? '-fill' : ''}`}></i>
                      </button>
                    </div>
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
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Trước
                </button>
              </li>
              
              {[...Array(totalPages)].map((_, index) => (
                <li 
                  key={index}
                  className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={() => dispatch(setCurrentPage(index + 1))}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}

              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button 
                  className="page-link"
                  onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};

export default StudentManagement;