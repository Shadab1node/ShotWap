var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    companyname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contactnumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
    },
    tokens: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

var User = mongoose.model("user", userSchema);
module.exports = User;
