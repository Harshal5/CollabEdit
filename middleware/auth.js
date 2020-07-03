const jwt = require('jsonwebtoken');
const config = require('../config');

const auth = (req, res, next) => {
    const token = req.header('docsync');
    // console.log(token)
    if (!token) {
        return res.status(401).json({ msg: 'JWT Not Found' });
    }
    try {
      const decoded = jwt.verify(token, config.get('jwtSecret'));
      // console.log(decoded)
      req.user = decoded.user;
      next();
    } catch (err) {
      //console.log(err);
      res.status(400).json({ msg: 'Token is not valid' });
    }
  };
  
  module.exports = auth;

