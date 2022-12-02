const mongoose = require("mongoose");

const userModel = mongoose.Schema(
  {
    _id: { type: String },
    displayName: { type: String, require: true },
    email: { type: String, require: true },
    uid: { type: String },
    photoURL: {
      type: String,

      default:
        "https://beaconsultlb.com/wp-content/uploads/2022/05/anonymous-avatar-icon-25.png",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userModel);
module.exports = User;
