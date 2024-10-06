const axios = require('axios');
const { Problem } = require('../models/codeModel');

// Handle code submission and Judge0 execution
const submitCode = async (req, res) => {
    console.log(req.body);
  const { code, language, problemId } = req.body;

  try {
    // Find the problem by ID and get its test cases
    const problem = await Problem.findById(problemId);
    if (!problem) return res.status(404).json({ error: "Problem not found" });

    const submissionResults = [];

    // Loop through test cases and execute user code
    for (const testCase of problem.testCases) {
      const submission = await axios.post('https://api.judge0.com/submissions', {
        source_code: code,
        language_id: getLanguageId(language),
        stdin: testCase.input
      });

      const submissionId = submission.data.token;

      // Poll the Judge0 API until the execution is done
      let result;
      do {
        result = await axios.get(`https://api.judge0.com/submissions/${submissionId}`);
      } while (result.data.status.id < 3);

      // Check if the output matches the expected output
      const isCorrect = result.data.stdout.trim() === testCase.expectedOutput.trim();
      submissionResults.push({
        testCase: testCase.input,
        expected: testCase.expectedOutput,
        received: result.data.stdout.trim(),
        isCorrect
      });
    }

    // Send results back to the frontend
    res.json(submissionResults);

  } catch (error) {
    console.error('Error during code submission:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Helper function to map languages to Judge0 language IDs
const getLanguageId = (language) => {
  const languages = {
    python3: 71,
    javascript: 63,
    cpp: 54,
  };
  return languages[language] || 71;
};

const findProblem = async (req,res) => {
    try {
        // You can either fetch all problems or just return a specific one
        const problem = await Problem.findOne({ title: "Sum of Two Numbers" });
        res.json(problem);
      } catch (error) {
        console.error("Error fetching problem:", error);
        res.status(500).json({ error: "Error fetching problem" });
      };
}

module.exports = {
  submitCode, 
  findProblem
};
