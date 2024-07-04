// getting-started.js
const mongoose = require("mongoose");
require("dotenv").config();

// const DBURL = "mongodb://127.0.0.1:27017/userauth"

const DBURL = process.env.DB_URL;

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(DBURL);
  console.log("DB connected");
}
