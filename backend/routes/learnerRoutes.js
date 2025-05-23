const express = require('express');
const router = express.Router();
const { protect, learnerOnly } = require('../middleware/authMiddleWare');
const { getCourseContent } = require('../controllers/learnerController');
const { saveChapterProgress } = require('../controllers/learnerController');

router.get('/course/:id', protect, learnerOnly, getCourseContent);
router.post('/progress', protect, learnerOnly, saveChapterProgress);

module.exports = router;
