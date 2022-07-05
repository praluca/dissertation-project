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
// router.get("/filtered", auth, async (req, res) => {
//   try {
//     const products = await Product.find();
//     console.log(
//       "testttt",
//       req.query.brands,
//       req.query.categories,
//       req.query.price
//     );
//     let brands = [];
//     if (req.query.brands != undefined) {
//       brands = req.query.brands.split(",");
//     }
//     let categories = [];
//     if (req.query.categories != undefined) {
//       categories = req.query.categories.split(",");
//     }
//     // let price = [];
//     // if (req.query.price != undefined) {
//     //   price = req.query.price.split(",");
//     // }
//     console.log("categories", categories);
//     console.log(brands);
//     let filteredProducts = [];
//     products.forEach((elem) => {
//       if (req.query.brands && !req.query.categories && !req.query.price1) {
//         if (brands.indexOf(elem.brand) != -1) {
//           filteredProducts.push(elem);
//         }
//       } else if (
//         req.query.categories &&
//         !req.query.brands &&
//         !req.query.price1
//       ) {
//         if (categories.indexOf(elem.category) != -1) {
//           filteredProducts.push(elem);
//         }
//       } else if (
//         !req.query.categories &&
//         !req.query.brands &&
//         (req.query.price1 || req.query.price2 || req.query.price3)
//       ) {
//         if (req.query.price1) {
//           filteredProducts = products.filter(
//             (p) => p.price < Number(req.query.price1)
//           );
//         } else if (req.query.price2) {
//           filteredProducts = products.filter(
//             (p) => p.price < Number(req.query.price2) && p.price > 50
//           );
//         } else if (req.query.price3) {
//           filteredProducts = products.filter(
//             (p) => p.price > Number(req.query.price3)
//           );
//         }
//       } else if (req.query.categories && req.query.brands) {
//         if (
//           categories.indexOf(elem.category) != -1 &&
//           brands.indexOf(elem.brand) != -1
//         ) {
//           console.log("elem", elem.category, elem.brand);
//           filteredProducts.push(elem);
//         }
//       }
//     });
//     res.json({ products: filteredProducts.length });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

router.get("/filtered", auth, async (req, res) => {});
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
