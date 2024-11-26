// backend/controllers/courseController.js
const Course = require('../models/Course');

// Lấy danh sách khóa học
const getCourses = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const searchTerm = req.query.search || '';

    const query = {
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ]
    };

    const totalCourses = await Course.countDocuments(query);
    const totalPages = Math.ceil(totalCourses / limit);

    const courses = await Course.find(query)
      .populate('instructor', 'name email')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      courses,
      currentPage: page,
      totalPages
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching courses' });
  }
};

// Cập nhật giá và trạng thái premium của khóa học
const updateCourse = async (req, res) => {
  try {
    const { price, isPremium } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { price, isPremium },
      { new: true }
    ).populate('instructor', 'name email');

    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.json(course);
  } catch (error) {
    res.status(500).json({ message: 'Error updating course' });
  }
};

module.exports = {
  getCourses,
  updateCourse
};