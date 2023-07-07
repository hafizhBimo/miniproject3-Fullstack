const { transaction: authTransaction } = require("./../controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.post("/product/:id",
    authMiddleware.verifyToken,
    authTransaction.addItemToCart
);

router.get("/cart",
    authTransaction.getCart
);

router.patch("/cart",
    authTransaction.emptyCart
);

router.patch("/cart/:id",
    authTransaction.removeItemfromCart
);

router.post("/cart/checkout",
    authMiddleware.verifyToken,
    authTransaction.checkoutOrder
);


module.exports = router;