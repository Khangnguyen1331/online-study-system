// backend/routes/courseRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const { getCourses, updateCourse } = require('../controllers/courseController');

const router = express.Router();

router.get('/', getCourses);
router.put('/:id', protect, authorize('admin'), updateCourse);

module.exports = router;