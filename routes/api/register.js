const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../../models/User.model");
const config = require("../../config");

router.post("/register", async (req, res, next) => {
  try{
    let { name, email, password } = req.body;
    const newUser = new User({
      name: name,
      email: email,
      password: password
    });
    
    // bcrypt.genSalt(10, (err, salt) => {
    //     bcrypt.hash(newUser.password, salt, (err, hash) => {
    //       if (err) throw err;
    //       newUser.password = hash;
    //       newUser.save();
    //     });
    // });
    
    let hashedPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashedPassword;
    newUser.save();
    console.log(newUser);


    const payload = {
      name, 
      email
    };

    let token = await jwt.sign(payload ,config.secret);
    // console.log(newUser);
    return res.status(200).json({
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