const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});
router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products, success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    const cartItems = user.cart.map(item => {
      const totalAmount = (Number(item.price) - Number(item.discount) + 20).toFixed(2);

      return {
        ...item.toObject(),  // Convert item to plain object if it's a mongoose document
        totalAmount
      };
    });

    res.render("cart", { user, cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("An error occurred while fetching the cart.");
  }
});





router.get("/addtocart/:productid", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  await user.cart.push(req.params.productid);
  await user.save();
  req.flash("success", "Added to cart");
  res.redirect("/shop");
});

router.get("/logout", isLoggedIn, function (req, res) {
  res.render("shop");
});
module.exports = router;
