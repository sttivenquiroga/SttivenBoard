const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/registerUser", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!req.body) {
    res.status(400).send("No hay datos para guardar");
  }else{
    if (!req.body.name) return res.status(400).send("No se ingresó un nombre");
    if (!req.body.email) return res.status(400).send("No se ingresó un correo");
    if (!req.body.password) return res.status(400).send("No se ingresó una contraseña")
  }
  if (user) return res.status(400).send("Ya esta registrado este correo electronico");
  const hash = await bcrypt.hash(req.body.password, 10); // Password encryptation
  user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hash,
  });
  const result = await user.save();
  if (result) {
    const jwtToken = user.generateJWT();
    res.status(200).send({ jwtToken });
  } else {
    res.status(400).send("No se pudo registrar el usuario");
  }
});

module.exports = router;
