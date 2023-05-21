const mongoose = require('mongoose');

const scientistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  specialty: {
    type: String,
    required: true
  },
  experiments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Experiment'
  }]
});

module.exports = mongoose.model('Scientist', scientistSchema);
