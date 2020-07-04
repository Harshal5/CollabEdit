const mongoose = require("mongoose");
const User = require("./User.model");

const docSchema = new mongoose.Schema(
    {
        text: {
          type: String,
          required: true,
          // maxLength: 200
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    },
    {
      timestamps: true
    }
);

docSchema.pre("remove", async function(next) {
    try {
        let user = await User.findById(this.user);
        user.docs.remove(this.id);
        await user.save();
        return next();
    } catch (err) {
        return next(err);
    }
});

const Doc = mongoose.model("Doc", docSchema);
module.exports = Doc;
  