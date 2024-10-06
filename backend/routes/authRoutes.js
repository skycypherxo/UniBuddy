const express = require('express');
const {login , logout , signup } = require('../controllers/authController');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const upload = require('../middlewares/uploadMiddleware');

router.post('/login', login);
router.post('/signup', upload.single('profilePicture') ,signup);
router.get('/logout', logout);


router.get('/protected', (req, res) => {
    res.status(200).json({ message: "You are authenticated" });
});

router.get('/profile', async (req, res) => {
    try {
        const token = req.cookies.token; 
        console.log("/profile wala token", token);
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const profilePicUrl = user.profilePic ? `/uploads/profilePictures/${user.profilePic}` : null;
        console.log(profilePicUrl);
        res.status(200).json({
            email: user.email,
            profilePicture: profilePicUrl,
        });
    } catch (err) {
        console.error("Error fetching user profile:", err);
        res.status(500).json({ message: "Error fetching user profile" });
    }
});

module.exports = router;