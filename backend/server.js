
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const learnerRoutes = require('./routes/learnerRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/learn', learnerRoutes);

app.get('/', (req, res) => {
  res.send('API has started working');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port with number:${PORT}`));
