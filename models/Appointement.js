const mongoose = require("mongoose");

const AppointementSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  hour: {
    type: String,
    required: true,
  },
  state: {
    type: String,
  },
  pacientId: {
    type: String,
  },
});

module.exports = Appointements = mongoose.model(
  "appointement",
  AppointementSchema
);
