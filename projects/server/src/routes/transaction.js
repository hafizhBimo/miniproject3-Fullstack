const { transaction: authTransaction } = require("./../controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.post("/product/:id",
    authMiddleware.verifyToken,
    authTransaction.addItemToCart
);

router.get("/cart",
    authMiddleware.verifyToken,
    authTransaction.getCart
);

router.patch("/cart",
    authMiddleware.verifyToken,
    authTransaction.emptyCart
);

router.patch("/cart/:id",
    authMiddleware.verifyToken,
    authTransaction.removeItemfromCart
);

router.post("/cart/checkout",
    authMiddleware.verifyToken,
    authTransaction.checkoutOrder
);

router.get("/totalTransaction",
    authMiddleware.verifyToken,
    authTransaction.totalTransaction
);


module.exports = router;