const Product = require("../models/product");
const https = require("https");
const apiResponse = require("../utils/apiResponse");

const fetch = (url) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          data = JSON.parse(data);
          resolve(data);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const uploadProduct = async (req, res) => {
  await Product.deleteMany({});
  const url = "https://fakestoreapi.com/products";
  try {
    const data = await fetch(url);
    const product = await Product.insertMany(data);
    apiResponse.sendResponse(
      { message: "Data uploaded Successfully." },
      200,
      res
    );
  } catch (err) {
    console.error(err);
  }
};

const getProduct = async (req, res) => {
  const options = { limit: 10 };
  if (req.query.offset) {
    options.skip = parseInt(req.query.offset);
  }
  const { search = {}, filter = {} } = req.body;
  const query = {
    is_deleted: false,
  };
  if (filter.category) {
    query.category = { $in: filter.category };
  }
  if (filter.price) {
    const min = filter.price.min || 0;
    const max = filter.price.max || 99999999;
    query.price = { $lte: max, $gte: min };
  }
  if (search.title) {
    query.title = { $regex: search.title };
  }
  const product = await Product.find(query, {}, options);

  apiResponse.sendResponse(product, 200, res);
};

const addProduct = async (req, res) => {
  const data = req.body;
  const product = await Product.create(data);
  apiResponse.sendResponse(product, 200, res);
};

const editProduct = async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  try {
    const status = await Product.updateOne({ _id: id }, { $set: updateData });
    if (status.matchedCount === 1) {
      apiResponse.sendResponse(null, 200, res);
    } else {
      apiResponse.sendErrorResponse({ err: "id not found" }, 500, res);
    }
  } catch (err) {
    apiResponse.sendErrorResponse(err, 500, res);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const status = await Product.updateOne(
      { _id: id },
      { $set: { is_deleted: true } }
    );
    if (status.matchedCount === 1) {
      apiResponse.sendResponse(null, 200, res);
    } else {
      apiResponse.sendErrorResponse({ err: "id not found" }, 500, res);
    }
  } catch (err) {
    apiResponse.sendErrorResponse(err, 500, res);
  }
};

module.exports = {
  uploadProduct,
  getProduct,
  addProduct,
  editProduct,
  deleteProduct,
};
