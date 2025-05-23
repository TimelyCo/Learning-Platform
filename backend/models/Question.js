const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Chapter',
    required: true,
  },
  type: {
    type: String,
    enum: ['mcq', 'fill', 'text', 'audio'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: [String], // Only for MCQ or fill-in-the-blank
  correctAnswer: {
    type: String,
    required: true,
  },
  media: String, // Optional: image/audio URL
});

module.exports = mongoose.model('Question', questionSchema);
