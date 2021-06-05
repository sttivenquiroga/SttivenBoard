const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multiparty = require("connect-multiparty");
const mult = multiparty();
const fs = require("fs");
const path = require("path");
const moment = require("moment");
const Board = require("../models/board");
const Auth = require("../middleware/auth");
const UserAuth = require("../middleware/user");
const Upload = require("../middleware/file");

router.post("/saveTask", Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(401).send("Process failed: Incomplete data");
  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
  });

  const result = await board.save();
  if (!result)
    return res.status(401).send("Process failed: Failed to register task");
  return res.status(200).send({ result });
});

router.get("/listTask", Auth, UserAuth, async (req, res) => {
  const validId = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!validId) return res.status(401).send("Process failed: Invalid id");
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(401).send("Process failed: No tasks to delete");
  return res.status(200).send({ board });
});

router.post("/saveTaskImg", mult, Upload, Auth, UserAuth, async (req, res) => {
  if (!req.body.name || !req.body.description)
    return res.status(400).send("Precess failed: Incomplete data");

  let imageUrl = "";
  if (req.files !== undefined && req.files.image.type) {
    const url = req.protocol + "://" + req.get("host") + "/";
    let serverImg =
      "./uploads/" + moment().unix() + path.extname(req.files.image.path);
    fs.createReadStream(req.files.image.path).pipe(
      fs.createWriteStream(serverImg)
    );
    imageUrl =
      url + "uploads/" + moment().unix() + path.extname(req.files.image.path);
  }
  const board = new Board({
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: "to-do",
    imageUrl: imageUrl,
  });
  const result = await board.save();
  if (!result)
    return res.status(400).send("Process failed: Failed to register task");
  return res.status(200).send({ result });
});

/**
 * Find tasks
 */
router.get("/listTask", Auth, UserAuth, async (req, res) => {
  const validateId = mongoose.Types.ObjectId.isValid(req.user._id);
  if (!validateId) return res.status(400).send("Process failed: Invalid Id");
  const board = await Board.find({ userId: req.user._id });
  if (!board) return res.status(400).send("Process failed. No tasks to show");
  return res.status(200).send({ board });
});

/**
 * Udate and verificate tasks
 */
router.put("/updateTask", Auth, UserAuth, async (req, res) => {
  if (
    !req.body._id ||
    !req.body.name ||
    !req.body.description ||
    !req.body.status
  )
    return res.status(400).send("Precess failed: Incomplete data");
  const validateId = mongoose.Types.ObjectId.isValid(req.body._id);
  if (!validateId) return res.status(400).send("Process failed: Invalid Id");
  const board = await Board.findByIdAndUpdate(req.body._id, {
    userId: req.user._id,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
  });
  if (!board) return res.status(400).send("Process failed: Task not found");
  return res.status(200).send({ board });
});

/**
 * Delete task
 */
router.delete("/deleteTask/:_id", Auth, UserAuth, async (req, res) => {
  const validateId = mongoose.Types.ObjectId.isValid(req.params._id);
  if (!validateId) return res.status(400).send("Process failed: Invalid Id");
  const board = await Board.findByIdAndDelete(req.params._id);
  if (!board) return res.status(400).send("Process failed: Task not found");
  return res.status(200).send("Task deleted");
});

module.exports = router;
