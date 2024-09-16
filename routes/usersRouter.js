const express = require("express");
const router = express.Router();
const { registerUser, loginUser ,logout } = require("../controllers/authControllers");
const isLoggedIn = require("../middlewares/isLoggedIn");


router.get("/", function (req, res) {
  res.send(" Hey ");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

module.exports = router;
