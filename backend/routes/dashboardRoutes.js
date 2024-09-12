const express = require('express');
const getDashBoardData = require('../controllers/dashboardController');
const authenticate = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/info', authenticate , getDashBoardData);

module.exports = router;