const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  experiationDate: {
    type: String,
  },
  price: {
    type: Number,
  },
  description: {
    type: String,
  },
  img: {
    type: String,
  },
  priceId: {
    type: String,
  },
});

module.exports = Products = mongoose.model("product", ProductSchema);
