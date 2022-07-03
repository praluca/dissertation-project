const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Appointements = require("../../models/Appointement");
const DoctorAppointements = require("../../models/DoctorsAppointements");

router.get("/:id", auth, async (req, res) => {
  try {
    console.log("id", req.params.id);
    const appointements = await Appointements.find();
    userAppointements = [];
    appointements.forEach((elem) => {
      if (elem.pacientId == req.params.id) {
        userAppointements.push(elem);
      }
    });

    res.json({ appointements: userAppointements });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.post("/:id/:doctorId", auth, async (req, res) => {
  const { doctorName, specialisation, date, hour } = req.body;
  try {
    let pacientId = req.params.id;
    state = "viitoare";
    consultation = new Appointements({
      doctorName,
      specialisation,
      date,
      hour,
      state,
      pacientId,
    });
    await consultation.save();
    let doctorApps = await DoctorAppointements.find();
    doctorApps.forEach(async (elem) => {
      if (elem.doctorId == req.params.doctorId) {
        console.log(
          "hereeeeeee",
          req.params.doctorId,
          elem.doctorId == req.params.doctorId
        );
        elem.appointements.forEach((e) => {
          if (e.date == date) {
            e.hour.push(date);
          } else {
            elem.appointements.push({ date: date, hour: [hour] });
          }
        });
        await elem.save();
      }
    });
    res.send({ consultation: consultation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.patch("/change-state/:id", auth, async (req, res) => {
  const { state } = req.body;
  try {
    let appointement = await Appointements.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    await appointement.save();
    res.send({ appointement: appointement });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
router.delete("/:appointementId", auth, async (req, res) => {
  try {
    await Appointements.deleteOne({ _id: req.params.appointementId });
    res.json({ deleted: true });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
