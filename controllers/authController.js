const jwt = require('jsonwebtoken');

// Controller to handle login
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Check if both username and password are provided
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Validate the credentials (you can replace this with DB validation later)
  if (username === 'admin' && password === '1234') {

    // Ensure JWT_SECRET is available
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT_SECRET not found in environment variables' });
    }

    // Create JWT token
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '2h' });

    // Send back the token as a response
    return res.json({ token });
  } else {
    // Invalid credentials
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
