require("dotenv").config();
const mongoose = require(`mongoose`);

async function dbConnect() {
  try {
    await mongoose.connect(`${process.env.MONGODB}`);
    console.log(`DB connection has been secured`);
  } catch (err) {
    console.error(err.message);
  }
}

module.exports = { dbConnect };
