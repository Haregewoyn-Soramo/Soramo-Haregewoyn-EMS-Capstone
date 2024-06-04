    const jwt = require('jsonwebtoken');
    const User = require('../models/userSchema');

    const authenticateToken = (req, res, next) => {
      const authHeader = req.header('Authorization');
      if (!authHeader) {
        console.log('Authorization header missing');
        return res.status(401).json({ message: 'Access Denied' });
      }

      const token = authHeader.split(' ')[1];
      if (!token) {
        console.log('Token missing in Authorization header');
        return res.status(401).json({ message: 'Access Denied' });
      }

      try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        console.log('Token verified, user:', req.user);
        next();
      } catch (err) {
        console.log('Token verification failed:', err.message);
        res.status(400).json({ message: 'Invalid Token' });
      }
    };

    const checkRole = (roles) => (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        console.log(`User role "${req.user.role}" not authorized`);
        return res.status(403).json({ message: 'Forbidden' });
      }
      next();
    };

    module.exports = {
      authenticateToken,
      checkRole,
    };
