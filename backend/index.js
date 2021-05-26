const express = require("express");
const mongoose = require("mongoose");

const User = require("./routes/user");
const Auth = require("./routes/auth");
const Board = require("./routes/board");

const app = express();

app.use(express.json());
app.use("/api/user/", User);
app.use("/api/auth/", Auth);
app.use("/api/board/", Board);

const port = process.env.PORT || 3002;

app.listen(port, () =>
  console.log("Servidor en ejcución en el puerto " + port)
);

mongoose
  .connect("mongodb://localhost:27017/stivenBoardDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Conexión con Mongo DB: Activa"))
  .catch((err) => console.log("Error en conexion con Mongo DB, error: ", err));
