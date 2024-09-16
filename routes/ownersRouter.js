const express = require("express");
const ownerModel = require("../models/owners-model");
const router = express.Router();

if (process.env.NODE_ENV === "development") {
  router.post("/create", async function (req, res) {
    let owners = await ownerModel.find();
    if (owners.length > 0) {
      return res
        .send(503)
        .send("You don't have permission to create new owner.");
    }
    let createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    res.send(201).send(createdOwner);
  });
}

router.get("/admin", function (req, res) {
  let success = req.flash("success");
  res.render("createproducts", { success });
});

module.exports = router;
