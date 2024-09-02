const Size = require("../models/sizeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createSize = asyncHandler(async (req, res) => {
  try {
    const newSize = await Size.create(req.body);
    res.json(newSize);
  } catch (error) {
    throw new Error(error);
  }
});
const authenticate = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedSize = await Size.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSize);
  } catch (error) {
    throw new Error(error);
  }
});
authenticate()
module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSize,
  getallSize,
};
