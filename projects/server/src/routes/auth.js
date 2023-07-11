const { auth: authController } = require("./../controller");
const router = require("express").Router();
const validateMiddleware = require("../middleware/validation/auth");
const authMiddleware = require("../middleware/auth");

router.post(
  "/register",
  validateMiddleware.validateRegister,
  authController.register
);

router.post("/login", authController.login);

router.get("/keepLogin", authMiddleware.verifyToken, authController.keepLogin);

module.exports = router;
