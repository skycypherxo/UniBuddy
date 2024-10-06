const express = require('express');
const router = express.Router();
const { submitCode, findProblem } = require('../controllers/codeController');

router.get('/problems', findProblem);
router.post('/submit-code', submitCode);

module.exports = router;
