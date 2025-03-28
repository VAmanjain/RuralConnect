const mongoose = require('mongoose');

// Define the Job schema
const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  salary: { type: String, required: true },
  type: { type: String, required: true },
  skills: { type: [String], required: true },
  description: { type: String, required: true },
}, { timestamps: true });

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;