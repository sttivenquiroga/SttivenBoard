const express = require("express");
const router = express.Router();
const Board = require("../models/board");
const User = require("../models/user");
const Auth = require("../middleware/auth");

router.post("/saveTask", Auth, async (req, res) =>{
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no identificado");
    const board = new Board({
        userId: user._id,
        name: req.body.name,
        description: req.body.description,
        status: "to-do",
    });
    const result = await board.save();
    return res.status(200).send({result});
});

router.get("/listTask", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no registra en DB");
    const board = await Board.find({userId: req.user._id});
    return res.status(200).send({board});
});

router.put("/updateTask", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no existe");
    const board = await Board.findByIdAndUpdate(req.body._id, {
        userId: user._id,
        nombre: req.body.name,
        description: req.body.description,
        status: req.body.status
    });
    if (!board) return res.status(400).send("No se pudo editar la actividad");
    return res.status(200).send({ board });
});

router.delete("/:_id", Auth, async (req, res) => {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(400).send("Usuario no existe");
    const board = await Board.findByIdAndDelete(req.params._id);
    if (!board) return res.status(400).send("No se pudo eliminar la tarea");
    return res.status(200).send("Tarea eliminada");
});

module.exports = router;