const express = require('express');
const router = express.Router();
const { protect, adminOnly } = require('../middleware/authMiddleWare');
const {
  createCourse,
  createSection,
  createUnit,
  createChapter,
} = require('../controllers/adminController');

// Admin-only routes
router.post('/courses', protect, adminOnly, createCourse);
router.post('/sections', protect, adminOnly, createSection);
router.post('/units', protect, adminOnly, createUnit);
router.post('/chapters', protect, adminOnly, createChapter);

module.exports = router;
