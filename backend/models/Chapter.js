const mongoose = require('mongoose');

const chapterSchema = new mongoose.Schema({
  unit: { type: mongoose.Schema.Types.ObjectId, ref: 'Unit', required: true },
  title: { type: String, required: true },
  content: String,
});

module.exports = mongoose.model('Chapter', chapterSchema);
