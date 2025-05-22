const mongoose = require('mongoose');

const sectionSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Section', sectionSchema);
