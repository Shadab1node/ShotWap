require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User, userOtp } = require("../../model/user");

const createToken = (user) => {
  return jwt.sign({ user }, process.env.PROCESS_KEY, {
    expiresIn: "7d",
  });
};

exports.userRegister = async (req, res) => {
  const profileImage = req.file ? req.file.filename : null;

  const {
    firstname,
    lastname,
    companyname,
    email,
    contactnumber,
    password,
  } = req.body;

  try {
    const checkUser = await User.findOne({ email });

    if (checkUser) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Email is already taken" }] });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    try {
      const user = await User.create({
        firstname,
        lastname,
        companyname,
        email,
        contactnumber,
        password: hash,
      });
      const token = createToken(user);
      return res
        .status(200)
        .json({ msg: "Your account has been created", user, token });
    } catch (error) {
      return res.status(500).json({ errors: error });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ errors: error });
  }
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const matched = await bcrypt.compare(password, user.password);
      if (matched) {
        const token = createToken(user);
        return res
          .status(200)
          .json({ msg: "You have login successfully", token, user });
      } else {
        return res
          .status(401)
          .json({ errors: [{ msg: "Password is not correct" }] });
      }
    } else {
      return res.status(404).json({ errors: [{ msg: "Email not found" }] });
    }
  } catch (error) {
    return res.status(500).json({ errors: error });
  }
};

exports.useremailsend = async (req, res) => {
  const { email } = req.body;
  if (email === "") {
    res.status(500).json({ msg: "Email is required" });
  } else {
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) {
        let otpData = new userOtp({
          email,
          code: Math.floor(100000 + Math.random() * 900000),
          expireIn: new Date().getTime() + 50 * 1000,
        });

        let optResponse = await otpData.save();
        mailer(email, otpData.code);
        return res.status(200).json({ msg: "OTP sended to your mail" });
      } else {
        return res.status(400).json({ errors: [{ msg: "Email not exist" }] });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ errors: error });
    }
  }
};

const mailer = (email, otp) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "shadabakhtar476@gmail.com",
      pass: "razaraza",
    },
  });
  var mailOptions = {
    from: "shadabakhtar476@gmail.com",
    to: email,
    subject: "OTP mail",
    text: otp,
  };
  mailTransporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

exports.userforgotpassword = async (req, res) => {
  var { email, code } = req.body;
  let otp = await userOtp.find({ email: email, code: code });
  if (otp) {
    let currentTime = new Date().getTime();
    let diff = otp.expireIn - currentTime;
    if (diff < 0) {
      return res.status(400).json({ errors: [{ msg: "Token expire" }] });
    } else {
      var email = req.body.email;
      let user = await User.findOne({ email });
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      user.password = hash;
      user.save();
      return res.status(200).json({ msg: "Password changes successfully" });
    }
  } else {
    return res.status(400).json({ errors: [{ msg: "Token Expired" }] });
  }
};


