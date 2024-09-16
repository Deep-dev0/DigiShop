const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const userModel = require("../models/user-model");

module.exports.registerUser = async function (req, res) {
  try {
    let { email, fullname, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user)
      return res.status(401).send("Account already exists, please login.");

    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.status(500).send(err.message);

      
        let newUser = await UserModel.create({
          email,
          fullname,
          password: hash,
        });
        let token = generateToken(newUser);
        res.cookie("token", token);
        res.send("User created successfully.");
      });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred.");
  }
};

module.exports.loginUser = async function (req, res) {
  try {
    let { email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (!user) return res.status(401).send("Email or password incorrect");

    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
       
        let token = generateToken(user);
        res.cookie("token", token);
        res.redirect("/shop");
      } else {
        res.status(401).send("Email or password incorrect");
      }
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("An error occurred.");
  }
};

module.exports.logout = function (req, res) {
  
  res.cookie("token", "");
  res.redirect("/");
};
