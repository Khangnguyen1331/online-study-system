// createAdmin.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const mongoURI = 'mongodb://localhost:27017/online-study-system'; // Thay thế bằng URI của bạn

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Đã kết nối tới MongoDB'))
.catch(err => {
  console.error('Không thể kết nối tới MongoDB:', err);
  process.exit(1);
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'instructor', 'student', 'studentPremium'], default: 'student' },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const adminData = {
  name: 'Admin Name',
  email: 'admin@example.com',
  phone: '0123456789',
  password: 'admin123', // Mật khẩu gốc
  role: 'admin',
  isPremium: false,
};

const createAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ email: adminData.email });
    if (existingAdmin) {
      console.log('Tài khoản admin đã tồn tại.');
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminData.password, salt);

    const admin = new User({
      name: adminData.name,
      email: adminData.email,
      phone: adminData.phone,
      password: hashedPassword,
      role: adminData.role,
      isPremium: adminData.isPremium,
    });

    await admin.save();
    console.log('Tạo tài khoản admin thành công!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tạo admin:', error);
    process.exit(1);
  }
};

createAdmin();
