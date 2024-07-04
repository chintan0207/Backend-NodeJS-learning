const mongoose = require('mongoose')

const DB = "mongodb://127.0.0.1:27017/learn"

async function main() {
    await mongoose.connect(DB);
    console.log("MongoDB connected")
}

main().catch((error) => { console.log(error) })
