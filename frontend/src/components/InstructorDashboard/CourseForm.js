// src/components/InstructorDashboard/CourseForm.js
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { createCourse, updateCourse } from '../../redux/actions/instructorActions';

const CATEGORIES = ['Frontend', 'Backend', 'Database', 'Mobile', 'Other'];

const CourseForm = ({ course, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Other',
    isPremium: false,
    image: null
  });
  const [imagePreview, setImagePreview] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (course) {
      setFormData({
        title: course.title,
        description: course.description,
        category: course.category,
        isPremium: course.isPremium
      });
      setImagePreview(course.image);
    }
  }, [course]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, image: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({
        ...formData,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (course) {
        await dispatch(updateCourse(course._id, formData));
      } else {
        await dispatch(createCourse(formData));
      }
      onClose();
    } catch (error) {
      setError(error.response?.data.message || 'Có lỗi xảy ra');
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header">
        <h5 className="mb-0">
          {course ? 'Chỉnh sửa khóa học' : 'Tạo khóa học mới'}
        </h5>
      </div>
      <div className="card-body">
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tên khóa học</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mô tả</label>
            <textarea
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="3"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Danh mục</label>
            <select
              className="form-select"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Ảnh khóa học</label>
            <input
              type="file"
              className="form-control"
              name="image"
              onChange={handleChange}
              accept="image/*"
              required={!course}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2"
                style={{ maxWidth: '200px' }}
              />
            )}
          </div>

          <div className="mb-3 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              name="isPremium"
              checked={formData.isPremium}
              onChange={handleChange}
            />
            <label className="form-check-label">Khóa học Premium</label>
          </div>

          <div className="d-flex justify-content-end gap-2">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Hủy
            </button>
            <button type="submit" className="btn btn-primary">
              {course ? 'Cập nhật' : 'Tạo mới'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CourseForm;