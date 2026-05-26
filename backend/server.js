/**
 * Start Server
 * connect to database
 */
require('dotenv').config()
const app = require("./src/app")
const mongoose = require("mongoose")
const connectToDB = require("./src/config/database")

connectToDB()

app.listen(process.env.PORT,()=>{
    console.log("Server running on port no. "+process.env.PORT);
})