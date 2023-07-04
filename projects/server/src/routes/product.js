const { product: authProduct } = require("./../controller");
const multerUpload = require("../middleware/multer");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.get("/product", authProduct.getAllProduct);

router.post("/",
    authMiddleware.verifyToken,
    multerUpload.single("file"),
    authProduct.createProductListing);

module.exports = router;