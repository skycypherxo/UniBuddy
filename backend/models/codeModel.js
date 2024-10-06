const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TestCaseSchema = new Schema({
  input: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  }
});

const ProblemSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  testCases: [TestCaseSchema] // Array of test cases
});

const Problem = mongoose.model('Problem', ProblemSchema);
module.exports = { Problem };
