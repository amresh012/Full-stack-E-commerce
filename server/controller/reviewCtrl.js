const review = require("../models/reviewModel");
const asyncHandle =  require("express-async-handler")
const { v4: uuidv4 } = require('uuid');



const getallReviews = asyncHandle(async (req, res)=>{
    const reviews = await review.find().populate("product")
})

