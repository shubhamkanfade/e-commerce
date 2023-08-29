const router = require("express").Router();
const product = require("../controller/product");

router.post("/upload", product.uploadProduct);
router.get("/", product.getProduct);
router.post("/add", product.addProduct);
router.put("/delete/:id", product.deleteProduct);
router.put("/:id", product.editProduct);

module.exports = router;
