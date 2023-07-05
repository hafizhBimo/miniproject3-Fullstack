const { transaction: authTransaction } = require("./../controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.post("/product/:id",
    authMiddleware.verifyToken,
    authTransaction.addItemToCart
);


module.exports = router;