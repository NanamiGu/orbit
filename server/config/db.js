require("dotenv").config()
const mongoose = require("mongoose")

const dbconnect =async ()=>{
    try {
        await mongoose.connect(process.env.db)
        console.log("connect")
    } catch (error) {
        console.log("don't connect",error)
    }
}
module.exports = dbconnect