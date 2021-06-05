const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

/**
 * Login module
 */
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Incorrect email o password");
  const hash = await bcrypt.compare(req.body.password, user.password);
  if (!user.active || !hash)
    return res.status(400).send("Incorrect email o password");
  try {
    const jwtToken = user.generateJWT();
    return res.status(200).send({ jwtToken });
  } catch (e) {
    return res.status(400).send("Login error");
  }
});

module.exports = router;
