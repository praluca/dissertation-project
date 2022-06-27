const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const VitalInformation = require("../../models/VitalInformations");

router.get("/:userId", auth, async (req, res) => {
  try {
    console.log("id", req.params.userId);
    const vitalInformations = await VitalInformation.find();
    userVitalInformations = {};
    vitalInformations.forEach((elem) => {
      if (elem.pacientId == req.params.userId) {
        userVitalInformations = elem;
      }
    });

    res.json({ vitalInformations: userVitalInformations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/:userId", auth, async (req, res) => {
  const {
    weight,
    height,
    bloodType,
    rh,
    allergies,
    weightHistory,
    sistolicTensionHistory,
    diastolicTensionHistory,
  } = req.body;
  try {
    let pacientId = req.params.userId;
    vitalInformation = new VitalInformation({
      weight,
      height,
      bloodType,
      rh,
      allergies,
      weightHistory,
      sistolicTensionHistory,
      diastolicTensionHistory,
      pacientId,
    });
    await vitalInformation.save();
    res.send({ vitalInformation: vitalInformation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.patch("/:vitalInformationId", auth, async (req, res) => {
  const {
    weight,
    height,
    bloodType,
    rh,
    allergies,
    weightHistory,
    sistolicTensionHistory,
    diastolicTensionHistory,
  } = req.body;
  try {
    let vitalInformation = await VitalInformation.findByIdAndUpdate(
      req.params.vitalInformationId,
      req.body
    );
    await vitalInformation.save();
    res.send({ vitalInformation: vitalInformation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:vitalInformationId", auth, async (req, res) => {
  try {
    console.log("id", req.params.id);
    await Investigation.deleteOne({ _id: req.params.investigationId });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
