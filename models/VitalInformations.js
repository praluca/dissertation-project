const mongoose = require("mongoose");

const VitalInformationSchema = new mongoose.Schema({
  weight: {
    type: Number,
  },
  height: {
    type: Number,
  },
  bloodType: {
    type: String,
  },
  rh: {
    type: String,
  },
  allergies: {
    type: String,
  },
  weightHistory: {
    type: Array,
  },
  sistolicTensionHistory: {
    type: Array,
  },
  diastolicTensionHistory: {
    type: Array,
  },
  pacientId: {
    type: String,
  },
});

module.exports = VitalInformation = mongoose.model(
  "vitalinformation",
  VitalInformationSchema
);
