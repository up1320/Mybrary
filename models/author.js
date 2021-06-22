const  mongoose  = require("mongoose");

var authorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    }

})

var authorModel = mongoose.model("Author",authorSchema)

module.exports = authorModel