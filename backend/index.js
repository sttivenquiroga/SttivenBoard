const express = require("express");
const cors = require("cors");
const { dbConnection } = require("./db/db");
require("dotenv").config();

const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");
const Role = require("./routes/role");

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);
app.use("/api/role/", Role);

app.listen(process.env.PORT, () =>
  console.log("Backend server running on port " + process.env.PORT)
);

dbConnection();
