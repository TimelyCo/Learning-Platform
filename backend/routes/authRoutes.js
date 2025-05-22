const express = require('express');
const router = express.Router();

const { registerUser, loginUser } = require('../controllers/authController');
const { protect, adminOnly } = require('../middleware/authMiddleWare');

router.post('/register', registerUser);
router.post('/login', loginUser);

router.get('/test-admin', protect, adminOnly, (req, res) => {
  res.send(`Hello Admin ${req.user.name}`);
});

module.exports = router;
