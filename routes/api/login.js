const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const User = require("../../models/User.model");

router.post("/login", async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;
    console.log(req.body);
    
    try{
        const user = await User.findOne({email}) 
        if(!user){
            return res.json({message: 'User not found'});
        }
        bcrypt.compare(password, user.password, function(err, isMatch) {
            console.log(isMatch);
            if (err){
                // handle error
                return res.status(400).json({ err: e });
            }
            if (isMatch){
                // Send JWT
                const name = user.name;
                console.log(name);
                
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
                // response is OutgoingMessage object that server response http request
                return res.json({success: false, message: 'passwords do not match'});
            }
        });
           

    } catch(e){
        return res.status(400).json({ err: e });
    }

    
});

module.exports = router;