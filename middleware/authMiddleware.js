const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware to verify JWT token
module.exports = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.header('Authorization')?.split(' ')[1];
  
  // If no token is found, return an error
  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    // Verify the token using the secret key from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If token is invalid or expired, return an error
    res.status(401).send('Invalid token');
  }
};
