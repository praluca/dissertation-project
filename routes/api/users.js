const bcrypt = require("bcryptjs");
const express = require("express");
const { check, validationResult } = require("express-validator/check");
const jwt = require("jsonwebtoken");
const router = express.Router();
const config = require("config");

const User = require("../../models/User");

//register a user
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("phone", "Phone is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, phone, email, password, status } = req.body;
    try {
      //see if user exists
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      user = new User({ name, phone, email, password, status });

      //encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  }
);

module.exports = router;
