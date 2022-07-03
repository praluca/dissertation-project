const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Doctor = require("../../models/Doctor");
const DoctorsAppointement = require("../../models/DoctorsAppointements");
const querystring = require("querystring");

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
// router.patch("/add-appointement/:doctorId", auth, async (req, res) => {
//   try {
//     const doctorsProfiles = await Doctor.find();
//     const doctorSort = doctorsProfiles.sort((a, b) => b.review - a.review);
//     const first4Doctors = doctorSort.slice(0, 4);
//     res.json({ doctorsProfiles: first4Doctors });
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });
router.get("/", auth, async (req, res) => {
  try {
    let intervals = [
      "9:00",
      "9:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "12:00",
      "12:30",
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
    ];
    const doctorsAppointement = await DoctorsAppointement.find();
    console.log(
      "spec",
      req.query.specialisation,
      req.query.location,
      req.query.date
    );
    let finalResponse = [];
    doctorsAppointement.forEach((elem) => {
      if (
        elem.specialisation == req.query.specialisation &&
        elem.location == req.query.location
      ) {
        elem.appointements.forEach((e) => {
          if (e.date == req.query.date) {
            e.hour.forEach((h) => {
              if (intervals.indexOf(h) !== -1) {
                intervals.splice(intervals.indexOf(h), 1);
              }
            });
          }
        });
        let rsp = {
          doctorName: elem.doctorName,
          doctorId: elem.doctorId,
          specialisation: elem.specialisation,
          location: elem.location,
          dispHour: intervals,
        };
        finalResponse.push(rsp);
      }
    });

    res.json({ doctorsAppointement: finalResponse });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
