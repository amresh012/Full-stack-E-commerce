const asyncHandle = require("express-async-handler");
const imgModel = require("../models/imagesModel");
const { mongooseError } = require("../middlewares/errorHandler");

const addimage = asyncHandle(async (req, res) => {
    const {name, url } = req.body;
    try {
        await imgModel.create(req.body);
        res.send({
            message: "image Added sucessfully",
            success: true,
        });
    } catch (error) {
        console.log(error);
    }

});

const getImg = asyncHandle(async (req, res) => {
    const imgConfig = await imgModel.find();
    res.json(imgConfig);
});

const deleteImage = asyncHandle(async (req, res) => {
    const { id } = req.params; // Image ID is passed as a parameter
    console.log(req.params);
  try {
    const image = await imgModel.findByIdAndDelete(id); // Find and delete the image by ID

    if (!image) {
      return res.status(404).send({
        message: "Image not found",
        success: false,
      });
    }

    res.send({
      message: "Image deleted successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error deleting image",
      success: false,
    });
  }
});



module.exports = {
  addimage,
  getImg,
  deleteImage,
};