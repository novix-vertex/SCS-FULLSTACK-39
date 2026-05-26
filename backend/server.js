/**
 * Start Server
 * connect to database
 */
const app = require("./src/app")
const mongoose = require("mongoose")
require('dotenv').config()

const connectToDB = require("./src/config/database")

connectToDB()

app.listen(process.env.PORT, () => {
    console.log("Server running on port no. " + process.env.PORT);
})