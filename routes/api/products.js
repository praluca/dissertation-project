const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Product = require("../../models/Product");

router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ products: products });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  const {
    productName,
    brand,
    quantity,
    category,
    experiationDate,
    price,
    description,
    img,
  } = req.body;
  try {
    product = new Product({
      productName,
      brand,
      quantity,
      category,
      experiationDate,
      price,
      description,
      img,
    });
    await product.save();
    res.send({ product: product });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
