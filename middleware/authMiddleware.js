const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  // 1. Check if Authorization header exists
  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  // 2. Extract token
  const token = authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach decoded user data to request
    req.user = decoded;

    // 5. Pass to next middleware or route
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
