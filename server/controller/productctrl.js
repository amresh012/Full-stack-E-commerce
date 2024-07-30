const asyncHandle = require("express-async-handler");
const ProductModel = require("../models/productModel");
const expressAsyncHandler = require("express-async-handler");
const exceljs = require("exceljs");
const xlsx = require("xlsx");

const addProduct = asyncHandle(async (req, res) => {
  let product = req.body;
  const alreadyavail = await ProductModel.findOne({ name: product.name });
  const subproducts = req.body.subItems?.map((ele) => ele?._id);
  product.subItems = subproducts;
  if (alreadyavail) {
    try {
      const updateproduct = await ProductModel.findOneAndUpdate(
        { name: product.name },
        product
      );
      res.send({
        message: "Product updated sucessfully",
        success: true,
        product: updateproduct,
      });
    } catch (error) {
      res.send({ message: error.message, error });
    }
  } else {
    try {
      const newproduct = await ProductModel.create(product);
      res.send({
        message: "Product Added sucessfully",
        success: true,
        product: newproduct,
      });
    } catch (error) {
      if (error.message.includes("duplicate")) {
        res.send({
          error: `Entered ${
            error.message.split("{")[1].split(":")[0]
          } is already registered`,
        });
      } else {
        res.send({ error: error.message, errorDetail: error });
      }
    }
  }
});

const deleteProduct = asyncHandle(async (req, res) => {
  const _id = req.params.id;
  if (_id) {
    try {
      await ProductModel.findByIdAndDelete({ _id });
      res.json({ success: true, message: "Deleted Sucessfully", _id });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else res.status(500).send({ error: error.message });
});

const updateproduct = asyncHandle(async (req, res) => {
  if (req.body._id) {
    const { _id } = req.body;
    try {
      const updateproduct = await ProductModel.findOneAndUpdate(
        { _id },
        req.body
      );
    } catch (error) {
      res.send(500).send({ error: error.message });
    }
  } else res.json("invalid Operation");
});

const searchProduct = asyncHandle(async (req, res) => {
  try {
    const { search, category, subcategory, brand } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: new RegExp(search, "i") } },
        { category: { $regex: new RegExp(search, "i") } },
        { brand: { $regex: new RegExp(search, "i") } },
      ];
    }
    if (category) {
      filter.category = category;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    if (brand) {
      filter.brand = brand;
    }
    const products = await ProductModel.find(filter).populate("subItems");
    res.json(products);
  } catch (error) {
    console.error("Error searching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getallProduct = asyncHandle(async (req, res, next) => {
  const Product = await ProductModel.find().populate("subItems");
  if (req.query) {
    next();
  } else {
    res.json(Product);
  }
});

const ValidateSchema = expressAsyncHandler(async (data) => {
  const errors = {};

  const productInstance = new ProductModel(data);

  productInstance.validateSync();

  const validationErrors = productInstance.errors;

  if (validationErrors) {
    Object.keys(validationErrors).forEach((key) => {
      errors[key] = validationErrors[key].message;
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
});
const uploadBulkProduct = expressAsyncHandler(async (req, res) => {
  const workbook = xlsx.readFile(req?.file?.path);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const excelData = xlsx.utils.sheet_to_json(sheet);
  const validProducts = [];
  const invalidProducts = [];

  for (let i = 0; i < excelData.length; i++) {
    const row = excelData[i];

    const productData = {
      name: row["name"],
      images: row["images"]?.split(","),
      price: row["price"],
      category: row["category"],
      subcategory: row["subcategory"],
      brand: row["brand"],
      itemCode: row["itemcode"],
      hsnCode: row["hsncode"],
      perpiece: row["priceperpiece"],
      unitMeausrement: row["unitofmeasurement"],
      measurement: row["meausrement"],
      retaildiscount: row["retaildiscount"],
      silverdiscount: row["silverdiscount"],
      golddiscount: row["golddiscount"],
      platinumdiscount: row["platinumdiscount"],
      mindiscription: row["minidiscription"],
      datasheet: row["datasheet"],
    };

    const validationResult = await ValidateSchema(productData);
    console.log(validationResult);

    if (validationResult.isValid) {
      validProducts.push(productData);
    } else {
      invalidProducts.push({
        rowIndex: i,
        validationError: validationResult?.errors,
      });
    }
  }

  res.send({ validProducts, invalidProducts });
  console.log("first");
});

module.exports = {
  addProduct,
  getallProduct,
  deleteProduct,
  updateproduct,
  searchProduct,
  uploadBulkProduct,
};
