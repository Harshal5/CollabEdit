const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const config = require("../../config");

const User = require("../../models/User.model");

router.post("/login", async (req, res, next) => {
    
    //console.log(req.body);
    
    try{
        let user = await User.findOne({email: req.body.email});
        let { name, email } = user;
        let isMatch = await user.comparePassword(req.body.password);
        console.log(isMatch);
        if (isMatch){            
            const payload = {
                name,
                email
            };
            let token =  jwt.sign(payload ,config.secret);
            return res.status(200).json({
                name,
                email,
                token
            });
        } else {
            return next({
                status: 400,
                message: "Invalid Email/Password."
            });
        }
        

    } catch(e){
        return next({ status: 400, message: "Invalid Email/Password." });
    }

    
});

module.exports = router;