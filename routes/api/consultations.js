const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Consultations = require("../../models/Consultations");

router.get("/:id", auth, async (req, res) => {
  try {
    console.log("id", req.params.id);
    const consultations = await Consultations.find();
    userConsultations = [];
    consultations.forEach((elem) => {
      if (elem.pacientId == req.params.id) {
        userConsultations.push(elem);
      }
    });

    res.json({ consultations: userConsultations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/:id", auth, async (req, res) => {
  const { doctorName, specialisation, date, diagnosis, investigation } =
    req.body;
  try {
    let pacientId = req.params.id;
    consultation = new Consultations({
      doctorName,
      specialisation,
      date,
      diagnosis,
      investigation,
      pacientId,
    });
    await consultation.save();
    res.send({ consultation: consultation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:consultationId", auth, async (req, res) => {
  try {
    console.log("id", req.params.id);
    await Consultations.deleteOne({ _id: req.params.consultationId });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
