const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  skills: {
    type: [String], // Array of skills
    required: true,
  },
}, { timestamps: true });

const Skills = mongoose.model('Skills', skillSchema);

module.exports = Skills;