const express = require("express");
const router = express.Router();

const User = require("../../models/User.model");
const Doc = require("../../models/Doc.model");

router.post("/", async (req, res, next) => {
    try {
        let doc = await Doc.create({
            text: req.body.text,
            user: req.params.id
        });
        let foundUser = await User.findById(req.params.id);
        foundUser.docs.push(doc.id);
        await foundUser.save();
        let foundDoc = await Doc.findById(doc._id).populate("user", {
            username: true,
            email: true
        });
        return res.status(200).json(foundDoc);
    } catch (err) {
        return next(err);
    }

});

router.get("/:doc_id", async (req, res, next) => {
    try {
        let doc = await Doc.find(req.params.doc_id);
        return res.status(200).json(doc);
    } catch (err) {
        return next(err);
    }
});

router.delete("/:doc_id", async (req, res, next) => {
    try {
        let foundDoc = await Doc.findById(req.params.doc_id);
        await foundDoc.remove();
        return res.status(200).json(foundDoc);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;