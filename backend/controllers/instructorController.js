// backend/controllers/instructorController.js
const Course = require('../models/Course');

// Lấy tất cả khóa học của instructor
const getInstructorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user.id })
      .sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi lấy danh sách khóa học' });
  }
};

// Tạo khóa học mới
const createCourse = async (req, res) => {
  try {
    const { title, description, category, isPremium } = req.body;
    const image = req.file ? req.file.path : ''; // Cần xử lý upload ảnh

    const course = new Course({
      title,
      description,
      image,
      category,
      isPremium,
      instructor: req.user.id
    });

    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi tạo khóa học' });
  }
};

// Cập nhật khóa học
const updateCourse = async (req, res) => {
  try {
    const { title, description, category, isPremium } = req.body;
    const courseId = req.params.id;

    let updateData = {
      title,
      description,
      category,
      isPremium
    };

    if (req.file) {
      updateData.image = req.file.path;
    }

    const course = await Course.findOneAndUpdate(
      { _id: courseId, instructor: req.user.id },
      updateData,
      { new: true }
    );

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi cập nhật khóa học' });
  }
};

// Xóa khóa học
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      _id: req.params.id,
      instructor: req.user.id
    });

    if (!course) {
      return res.status(404).json({ message: 'Không tìm thấy khóa học' });
    }

    res.json({ message: 'Đã xóa khóa học thành công' });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi khi xóa khóa học' });
  }
};

module.exports = {
  getInstructorCourses,
  createCourse,
  updateCourse,
  deleteCourse
};