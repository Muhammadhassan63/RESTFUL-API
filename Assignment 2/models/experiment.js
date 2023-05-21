const mongoose = require('mongoose');

const experimentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  scientist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Scientist',
    required: true
  }
});

module.exports = mongoose.model('Experiment', experimentSchema);
