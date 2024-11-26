const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// Đăng ký người dùng
const registerUser = async (req, res) => {
  const { name, email, phone, password } = req.body;

  try {
    // Kiểm tra xem email đã tồn tại chưa
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Email đã được sử dụng' });
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Tạo người dùng mới
    user = new User({
      name,
      email,
      phone,
      password: hashedPassword,
    });

    await user.save();

    // Tạo token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Đăng nhập người dùng
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Tìm người dùng theo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Không tìm thấy người dùng' });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mật khẩu không đúng' });
    }

    // Tạo token
    const token = generateToken(user._id);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        isPremium: user.isPremium,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
