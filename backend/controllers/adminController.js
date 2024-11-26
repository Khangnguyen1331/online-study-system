// backend/controllers/adminController.js
const User = require('../models/User');

// Thêm hàm lấy danh sách sinh viên
const getStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('-password'); // Không trả về password

    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: 'Error fetching students' });
  }
};

const getStatistics = async (req, res) => {
  try {
    const regularStudents = await User.countDocuments({
      role: 'student',
      isPremium: false
    });

    const premiumStudents = await User.countDocuments({
      role: 'student',
      isPremium: true
    });

    const totalStudents = regularStudents + premiumStudents;
    const revenue = premiumStudents * 500000; // Giả sử 500k mỗi tài khoản premium

    res.json({
      totalStudents,
      regularStudents,
      premiumStudents,
      totalRevenue: revenue
    });
  } catch (error) {
    console.error('Error getting statistics:', error);
    res.status(500).json({ message: 'Error getting statistics' });
  }

};
// backend/controllers/adminController.js

const getRegularStudents = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const searchTerm = req.query.search || '';

    const query = {
      role: 'student',
      isPremium: false,
      $or: [
        { name: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { phone: { $regex: searchTerm, $options: 'i' } }
      ]
    };

    const totalStudents = await User.countDocuments(query);
    const totalPages = Math.ceil(totalStudents / limit);

    const students = await User.find(query)
      .select('name email phone isPremium')
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    res.json({
      students,
      currentPage: page,
      totalPages
    });

  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
};

// Cập nhật phần còn lại của controller...

module.exports = {
  getStudents,
  getRegularStudents,
  getStatistics
};