// createInstructor.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Thay thế chuỗi kết nối dưới đây bằng chuỗi kết nối MongoDB của bạn
const mongoURI = 'mongodb://localhost:27017/online-study-system'; // Ví dụ

// Kết nối tới MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Đã kết nối tới MongoDB'))
.catch(err => {
  console.error('Không thể kết nối tới MongoDB:', err);
  process.exit(1);
});

// Định nghĩa Schema và Model người dùng
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'instructor', 'student', 'studentPremium'], default: 'student' },
  isPremium: { type: Boolean, default: false },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

// Thông tin instructor cần thêm
const instructorData = {
  name: 'Nguyễn Văn A', // Thay đổi tên theo ý bạn
  email: 'instructor@example.com', // Thay đổi email theo ý bạn
  phone: '0987654321', // Thay đổi số điện thoại theo ý bạn
  password: 'instructorpassword', // Mật khẩu gốc
  role: 'instructor',
  isPremium: false,
};

// Hàm để tạo instructor
const createInstructor = async () => {
  try {
    // Kiểm tra xem email đã tồn tại chưa
    const existingInstructor = await User.findOne({ email: instructorData.email });
    if (existingInstructor) {
      console.log('Tài khoản instructor đã tồn tại.');
      process.exit(0);
    }

    // Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(instructorData.password, salt);

    // Tạo đối tượng instructor mới
    const instructor = new User({
      name: instructorData.name,
      email: instructorData.email,
      phone: instructorData.phone,
      password: hashedPassword,
      role: instructorData.role,
      isPremium: instructorData.isPremium,
    });

    // Lưu vào cơ sở dữ liệu
    await instructor.save();
    console.log('Tạo tài khoản instructor thành công!');
    process.exit(0);
  } catch (error) {
    console.error('Lỗi khi tạo instructor:', error);
    process.exit(1);
  }
};

// Thực thi hàm tạo instructor
createInstructor();
