https://www.youtube.com/watch?v=5lWWOJBWeTA&list=PLbtI3_MArDOkXRLxdMt1NOMtCS-84ibHH&index=28
27:05

https://www.youtube.com/watch?v=5lWWOJBWeTA&t=2192s

https://youtu.be/up9db_91qEE?feature=shared&t=1521s


router.get("/cart", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    let cartItems = user.cart.map(item => {
      let totalMRP = Number(item.price);
      let discount = Number(item.discount);
      let platformFee = 20;
      let totalAmount = totalMRP - discount + platformFee;

      return {
        ...item.toObject(),  // Convert item to plain object if it's a mongoose document
        totalAmount: totalAmount.toFixed(2)  // Add totalAmount to the item
      };
    });

    res.render("cart", { user, cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("An error occurred while fetching the cart.");
  }
});