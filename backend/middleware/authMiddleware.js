const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Lấy token từ header
      token = req.headers.authorization.split(' ')[1];
      
      // Giải mã token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Lấy thông tin người dùng từ token
      req.user = await User.findById(decoded.id).select('-password');
      
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Không hợp lệ hoặc hết hạn token' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Không có token, quyền truy cập bị từ chối' });
  }
};

// Middleware phân quyền
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Không có quyền truy cập' });
    }
    next();
  };
};

module.exports = { protect, authorize };
