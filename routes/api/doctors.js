const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Doctor = require("../../models/Doctor");

router.get("/top-doctors", auth, async (req, res) => {
  try {
    const doctorsProfiles = await Doctor.find();
    const doctorSort = doctorsProfiles.sort((a, b) => b.review - a.review);
    const first4Doctors = doctorSort.slice(0, 4);
    res.json({ doctorsProfiles: first4Doctors });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
