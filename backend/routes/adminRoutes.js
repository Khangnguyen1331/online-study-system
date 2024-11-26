// routes/adminRoutes.js
const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getStudents,
  updateUserPremium,
  deleteUser,
  updateCoursePrice,
  getStatistics
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router.get('/students', getStudents);
router.put('/users/:id/premium', updateUserPremium);
router.delete('/users/:id', deleteUser);
router.put('/courses/:id/price', updateCoursePrice);
router.get('/statistics', getStatistics);

module.exports = router;