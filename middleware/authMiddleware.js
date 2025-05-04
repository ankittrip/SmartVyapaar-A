const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');

  if (!authHeader) {
    return res.status(401).json({ message: 'No authorization header provided' });
  }

  
  const token = authHeader.split(' ')[1]?.trim();

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
  
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

  
    req.user = decoded;

    
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};
