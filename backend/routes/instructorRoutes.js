// backend/routes/instructorRoutes.js
const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const {
  getInstructorCourses,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../controllers/instructorController');

// Cấu hình multer cho upload ảnh
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/courses');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.use(protect);
router.use(authorize('instructor'));

router.get('/courses', getInstructorCourses);
router.post('/courses', upload.single('image'), createCourse);
router.put('/courses/:id', upload.single('image'), updateCourse);
router.delete('/courses/:id', deleteCourse);

module.exports = router;