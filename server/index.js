const express = require('express');
 const app = express()
const conectdb=require("./config/db")
const routeuser=require("./routes/userRoute")

app.use(express.json())
conectdb()
app.get("/",(req,res)=>{
    res.end("<h1>hi thar </h1>")
})
app.use("/api/user",routeuser)
app.listen(5000,()=>{

    console.log("server run")
})