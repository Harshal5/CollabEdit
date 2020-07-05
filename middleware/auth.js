const config = require('../config');
const jwt = require("jsonwebtoken");

exports.loginRequired = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secret, function(err, decoded) {
      if (decoded) {
        next();
      } else {
        console.log("Please Log In First");
        // return res.status(400).json({ err: "Please Log In First" })
        return next({ status: 401, message: "TryElse: Please Log In First" });
      }
    });
  } catch (e) {
    console.log("Please Log In First");
    return res.status(400).json({ err: "Catch: Please Log In First" })
  }
};

exports.ensureCorrectUser = function(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, config.secret, function(err, decoded) {
      if (decoded && decoded.id === req.params.id) {
        return next();
      } else {
        return next({ status: 401, message: "TryElse: Unauthorized" });
      }
    });
  } catch (e) {
    return next({ status: 401, message: "Ctach: Unauthorized" });
  }
};