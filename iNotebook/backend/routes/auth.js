const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "MaheshDalle";

const fetchuser = require("../middlewares/fetchuser");
//Route 1 :  create a user using  :post "/api/auth/createuser". Doesnt require auth

router.post(
  "/createuser",
  [
    body("email", "Email Toh Daal Bhai").isEmail(),
    body("name", "Naam to Daal Bhai").isLength({ min: 3 }),
    body("password", "Enter a Tagda Password Bidu").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    //  check Whether the email exist already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({
          success,
          error: "Sorry email is alreay in use ",
        });
      }
      // Adding salt to gve more security into password

      const salt = await bcrypt.genSalt(10);
      const SecPass = await bcrypt.hash(req.body.password, salt);
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: SecPass,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
      console.log(token);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some Error Ocuured");
    }
  }
);

// Route:2  Authenticate a user using :Post: /api/auth/login : No Login Required
router.post(
  "/login",
  [
    body("email", "Email Toh Daal Bhai").isEmail(),
    body("password", "Password Toh Daal Bhai").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Sorry User Doesnt Exist" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Sorry User Doesnt Exist" });
      }
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, token });
      console.log(token);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Error");
    }
  }
);

// Route:3  Get Loged In User detail uisng :post /api/auth/getuser , Login Required
router.post(
  "/getuser",
  fetchuser,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Error");
    }
  }
);

module.exports = router;
