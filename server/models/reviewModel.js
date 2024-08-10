const mongoose = require("mongoose");


const reviewSchema =  new mongoose.Schema({
    name:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
        
    },
    email:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    review_title :{
        type:String,
        required:true
    },
    review_description:{
        type:String,
    },
    rating:{
        type:Number,
    },
    recommend:{
        type:Boolean
    }


})

module.exports = mongoose.model("Review", reviewSchema);