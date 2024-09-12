const express = require('express');
const getDashBoardData = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/dashboard', authenticate , getDashBoardData);

module.exports = router;