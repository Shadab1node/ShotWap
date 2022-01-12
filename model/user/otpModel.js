const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;

const profileSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  email: {
    type: String,
  },
  code: {
    type: String,
    required: true,
  },
  expireIn: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
});
var userOtp = mongoose.model("userOtp", profileSchema);
module.exports = userOtp;
