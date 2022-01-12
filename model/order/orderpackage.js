var mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var Schema = mongoose.Schema;

var packageschema = new Schema(
  {
    pickuppincode: {
      type: String,
    },
    destinationpincode: {
      type: String,
    },
    weight: {
      type: String,
    },
    dimention: {
      type: [
        {
          cm:String,
          length: String,
          height: String,
          width: String,
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

var Package = mongoose.model("package", packageschema);
module.exports = Package;
