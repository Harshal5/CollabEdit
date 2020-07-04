const express = require("express");
const router = express.Router();

const User = require("../../models/User.model");
const Doc = require("../../models/Doc.model");

router.post("/", async (req, res, next) => {
    try {
        let docs = await Doc.find()
          .sort({ createdAt: "desc" })
          .populate("user", {
            username: true,
            email: true
          });
        return res.status(200).json(docs);
    } catch (err) {
        return next(err);
    }

});

module.exports = router;