const mongoose = require("mongoose");

const boardSchema = mongoose.Schema({
    userId: String,
    name: String,
    description: String,
    status: String,
    imageUrl: String,
    date: {type: Date, default: Date.now},
});

const Board = mongoose.model("board", boardSchema);

module.exports = Board;