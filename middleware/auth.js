const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Get token from Header

  const token = req.header('x-auth-token');
  // Check if not token
  if (!token) {
    return res.status(401).json({ msg: 'No Token,authorization denied' });
  }

  // Verify Token
  //
  try {
    const decoded = jwt.verify(token, process.env.jwtSecret);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token Is not valid' });
  }
};
