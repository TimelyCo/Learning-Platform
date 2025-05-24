const express = require('express');
const router = express.Router();
const { protect, learnerOnly } = require('../middleware/authMiddleWare');
const { getCourseContent } = require('../controllers/learnerController');
const { saveChapterProgress } = require('../controllers/learnerController');
const { getAllCourses } = require('../controllers/learnerController');

router.get('/course/:id', protect, learnerOnly, getCourseContent);
router.post('/progress', protect, learnerOnly, saveChapterProgress);
router.get('/courses', protect, learnerOnly, getAllCourses);

module.exports = router;
