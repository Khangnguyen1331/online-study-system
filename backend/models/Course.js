// backend/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    maxLength: 100 // Giới hạn 10 từ
  },
  image: {
    type: String,
    required: true
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Database', 'Mobile', 'Other'] // Các categories
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);