const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }


  if (username === 'admin' && password === '1234') {
    
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '2h' });

    
    return res.json({ token });
  } else {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
};
