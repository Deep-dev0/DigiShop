const ownerModel = require("../models/owners-model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async function (req, res, next) {
  // Use req.cookies instead of req.cookie
  if (!req.cookies.token) {
    req.flash("error", "You need to login first");
    return res.redirect("/");
  }

  try {
    // Use req.cookies to access the token
    let decode = jwt.verify(req.cookies.token, process.env.JWT_KEY);
    let user = await userModel.findOne({ email: decode.email }).select("-password");
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (err) {
    req.flash("error", "Something went wrong.");
    res.redirect("/");
  }
};
