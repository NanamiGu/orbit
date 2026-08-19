const http = require("http")

const server = http.createServer((req,res)=>{
    res.end ("hi amine ")
})

server.listen(7000,()=>{
    console.log("server run")
})



const dbconnect = require("./config/db.js")
dbconnect()