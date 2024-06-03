const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: 'Forbidden' });
      }
      req.userId = decoded.userId; // Attach user ID to request object
      next();
    });
  };
  
  app.get('/protected-resource', verifyJWT, (req, res) => {
    // Access user ID from req.userId for authorization logic
    res.json({ message: 'Welcome, authorized user!' });
  });
  