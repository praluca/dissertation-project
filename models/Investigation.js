const mongoose = require("mongoose");

const InvestigationSchema = new mongoose.Schema({
  speciality: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

module.exports = Investigation = mongoose.model(
  "investigation",
  InvestigationSchema
);
