// models/Resume.js
const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  skills: [{ type: String }],
  experience: [{
    company: String,
    position: String,
    startDate: Date,
    endDate: Date,
    description: String
  }],
  education: [{
    institution: String,
    degree: String,
    fieldOfStudy: String,
    graduationDate: Date
  }]
});

module.exports = mongoose.model('Resume', ResumeSchema);