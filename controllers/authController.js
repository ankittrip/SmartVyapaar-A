const jwt = require('jsonwebtoken');


exports.login = (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  
  if (username === 'admin' && password === '1234') {


    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return res.status(500).json({ message: 'JWT_SECRET not found in environment variables' });
    }

    
    const token = jwt.sign({ username }, jwtSecret, { expiresIn: '2h' });

  
    return res.json({ token });
  } else {
    
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
