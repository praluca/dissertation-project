const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");
const Investigation = require("../../models/Investigation");

router.get("/", auth, async (req, res) => {
  try {
    const investigations = await Investigation.find();
    res.json({ investigations: investigations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/", auth, async (req, res) => {
  const { speciality, category, type, location, price } = req.body;
  try {
    investigation = new Investigation({
      speciality,
      category,
      type,
      location,
      price,
    });
    await investigation.save();
    res.send({ investigation: investigation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.patch("/:id", auth, async (req, res) => {
  const { speciality, category, type, location, price } = req.body;
  try {
    let investigation = await Investigation.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    await investigation.save();
    res.send({ investigation: investigation });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:investigationId", auth, async (req, res) => {
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
