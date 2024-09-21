const express = require('express');
const router = express.Router();
const { createEvent, getUserEvents } = require('../controllers/eventController');
const authenticate = require('../middlewares/authMiddleware');


router.post('/create', authenticate, createEvent);
router.get('/user-events', authenticate, getUserEvents);

module.exports = router;
