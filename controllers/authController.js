const jwt = require('jsonwebtoken');

// Login function
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Simple hardcoded validation for demo purposes
  if (username === 'admin' && password === '1234') {
    // Create JWT token (expires in 1 hour)
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
