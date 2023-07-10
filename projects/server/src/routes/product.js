const { product: authProduct } = require("./../controller");
const multerUpload = require("../middleware/multer");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.get("/", authProduct.getAllProduct);

router.get("/topSelling",
    authProduct.topSellingProduct
);

router.get("/myProduct", 
authMiddleware.verifyToken,
authProduct.getMyProduct);

router.get("/myProduct/topSelling", 
authMiddleware.verifyToken,
authProduct.myTopSellingProduct);

router.get("/:id", authProduct.singlePageProduct);

router.post("/",
    authMiddleware.verifyToken,
    multerUpload.single("file"),
    authProduct.createProductListing
);

router.patch("/:id",
    authMiddleware.verifyToken,
    multerUpload.single("file"),
    authProduct.ModifyProductListing
);

router.patch("/active/:id",
    authMiddleware.verifyToken,
    authProduct.modifyProductStatus
);






module.exports = router;