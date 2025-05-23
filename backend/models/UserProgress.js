const mongoose = require('mongoose');

const progressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  completedChapters: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' }],
  scores: [{
    chapter: { type: mongoose.Schema.Types.ObjectId, ref: 'Chapter' },
    score: Number,
  }],
}, { timestamps: true });

module.exports = mongoose.model('UserProgress', progressSchema);
