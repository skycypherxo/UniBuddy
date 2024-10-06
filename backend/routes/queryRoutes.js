const express = require("express");
const { exec } = require("child_process");
const router = express.Router();

const fullPathToPythonScript =
  "";

router.post("/query", (req, res) => {
  const query = req.body.query;
  console.log(query);

  exec(
    `python ${fullPathToPythonScript} "${query}"`,
    (error, stdout, stderr) => {
      console.log("Query sent to python");
      if (error) {
        console.error(`Error in exec: ${error.message}`);
        return res.status(500).send("Error in processing query in queryRouter");
      }
      if (stderr) {
        console.error("Stderr: ", stderr);
        return res.status(500).send("Error in stderr");
      }
      console.log(stdout);
      res.status(200).send(stdout);
    }
  );
});

module.exports = router;
