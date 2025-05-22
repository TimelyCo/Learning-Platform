const User = require('../models/User');
const generateToken = require('../utils/generateToken');


exports.registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'User already exists' });

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user);

    res.status(201).json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user);
    res.json({ _id: user._id, name: user.name, email: user.email, role: user.role, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
