const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const productModel = require("../models/product-model");

router.post("/create", upload.single("image"), async function (req, res) {
  try {
    let { name, price, discount, panelcolor, bgcolor, textcolor } = req.body;

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });
    req.flash("Succes", "product created successfully");
    res.redirect("owners/admin");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes
    res.status(500).send({ error: "Failed to create product" });
  }
});

module.exports = router;
