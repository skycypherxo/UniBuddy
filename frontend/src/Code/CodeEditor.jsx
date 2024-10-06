import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python3');
  const [output, setOutput] = useState(null);
  const [problem, setProblem] = useState(null);
  const [problemId, setProblemId] = useState(null);

  // Fetch the problem when the component loads
  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/code/problems'); // Endpoint for fetching the problem
        setProblem(response.data);
        setProblemId(response.data._id); // Set problemId from the fetched problem
      } catch (error) {
        console.error("Error fetching problem:", error);
      }
    };
    fetchProblem();
  }, []);

  const submitCode = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/code/submit-code', {
        code,
        language,
        problemId, // Include the problemId in the submission
      });
      setOutput(response.data);
    } catch (error) {
      console.error("Error executing code:", error);
    }
  };

  return (
    <div>
      <h1>Code Editor</h1>
      {problem && (
        <div>
          <h2>{problem.title}</h2>
          <p>{problem.description}</p>
        </div>
      )}
      <textarea value={code} onChange={(e) => setCode(e.target.value)} rows="10" cols="80" />
      <br />
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="python3">Python 3</option>
        <option value="javascript">JavaScript</option>
        <option value="cpp">C++</option>
      </select>
      <button onClick={submitCode}>Run Code</button>
      {output && (
        <div>
          <h2>Output:</h2>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
