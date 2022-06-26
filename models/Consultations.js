const mongoose = require("mongoose");

const ConsultationsSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  investigation: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  diagnosis: {
    type: String,
  },
  pacientId: {
    type: String,
  },
});

module.exports = Consultations = mongoose.model(
  "diagnosis",
  ConsultationsSchema
);
