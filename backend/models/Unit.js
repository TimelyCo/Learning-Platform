const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
  section: { type: mongoose.Schema.Types.ObjectId, ref: 'Section', required: true },
  title: { type: String, required: true },
});

module.exports = mongoose.model('Unit', unitSchema);
