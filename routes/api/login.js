const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("../../config");

const User = require("../../models/User.model");

router.post("/login", async (req, res) => {
    
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
            const payload = {
                id: user.id,
                name: user.name
        };
        console.log(config.secret);
        
        jwt.sign(
            payload,
            config.secret,
            {
                expiresIn: 3600
            },
            (err, token) => {
                res
                    .status(200)
                    .json({
                        token,
                        user_details: {
                            userId: user.name
                        }
                    });
            }
        );
        } else {
            return res
                .status(400)
                .json({ passwordincorrect: "Password incorrect" });
            }
    });
    });
});

module.exports = router;