const { product: authProduct } = require("./../controller");
const router = require("express").Router();

router.get("/product", authProduct.getAllProduct);


module.exports = router;