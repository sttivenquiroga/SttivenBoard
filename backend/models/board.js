const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "user"},
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: {type: Date, default: Date.now},
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;