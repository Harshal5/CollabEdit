const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../../models/User.model");
const config = require("../../config");

router.post("/register", async (req, res, next) => {
  try{
    // let { name, email, password } = req.body;
    let user = await User.create(req.body);
    let { id, name, email } = user;
    const payload = {
      id,
      name, 
      email
    };

    let token = jwt.sign(payload ,config.secret);
    // console.log(user);
    return res.status(200).json({
      id,
      name,
      email,
      token
    });

  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry, that username and/or email is taken";
    }
    console.log(err);
    
    return next({
      status: 400,
      message: err.message 
    });
  }

});

module.exports = router;