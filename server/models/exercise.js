const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({

  username: { type: String},
  description: { type: String},
  email: { type: String},
  salary: { type: String },
  duration: { type: String },
  date: { type: String},
  users: { type: String}

}, {
  timestamps: true,
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;