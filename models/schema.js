var mongoose  = require("mongoose");

var user = mongoose.Schema({
    uid:{
        type: Number
    },
    mName:{
        type: String
    },
    rating:{
        type: Number
    }
})


module.exports = mongoose.model("User",user);