
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


require('dotenv').config({ path: ".env" });
//console.log(process.env.JWT_SECRET);

const authenticate = (req, res, next) => {
  console.log("authMiddleware req.cookies: ", req.cookies);
  const token = req.cookies.token;
  console.log("Authenticate Middleware token: ", token);
  
  if (!token) {
    console.log("No token provided");
    req.user = null;
    return next();
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(req.user);
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authenticate;