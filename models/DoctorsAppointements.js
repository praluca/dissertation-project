const mongoose = require("mongoose");

const DoctorsAppointementSchema = new mongoose.Schema({
  doctorName: {
    type: String,
    required: true,
  },
  doctorId: {
    type: String,
    required: true,
  },
  specialisation: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  appointements: {
    type: Array,
    required: true,
  },
});

module.exports = DoctorsAppointement = mongoose.model(
  "doctorsAppointement",
  DoctorsAppointementSchema
);
