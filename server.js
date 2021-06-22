if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require("express")
const app = express()
const expressLayouts = require("express-ejs-layouts")
const router = require("./routes/index")
const mongoose = require("mongoose")
const authorRouter =require('./routes/authors')
const bodyParser  = require("body-parser")
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error',(err)=>{
    console.error(err)
})
db.once('open',()=>{
    console.log(`Connected to Mongoose ${db.host}`)
})
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}))
app.use(bodyParser.json())
app.set("view engine","ejs")
app.use(express.static(__dirname + "/views"))
app.set("layout","layouts/layout")
app.use(expressLayouts)
app.use(express.static(__dirname + "/public"))
app.use('/',router)
app.use("/authors",authorRouter)






app.listen(process.env.PORT || 3000,(req,res)=>{
    console.log("Server is running")
})