const asyncHandle = require("express-async-handler");
const imgModel = require("../models/imagesModel");
const { mongooseError } = require("../middlewares/errorHandler");

const addimage = asyncHandle(async (req, res) => {
    const siteConfig = req.body;
    try {
        await imgModel.create(siteConfig);
        res.send({
            message: "image Added sucessfully",
            success: true,
        });
    } catch (error) {
        mongooseError(error, res);
    }

});

const getImg = asyncHandle(async (req, res) => {
    const imgConfig = await imgModel.find();
    res.json(imgConfig);
});



module.exports = {
    addimage,
    getImg,
};