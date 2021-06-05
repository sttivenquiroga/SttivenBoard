const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Connecting with MongoDB: ON");
  } catch (e) {
    console.log("Error connecting to MongoBD: ", e);
    throw console.log("Error connecting to MongoBD");
  }
};

module.exports = { dbConnection };
