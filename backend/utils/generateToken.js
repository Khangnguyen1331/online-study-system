const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token có hiệu lực trong 30 ngày
  });
};

module.exports = generateToken;
