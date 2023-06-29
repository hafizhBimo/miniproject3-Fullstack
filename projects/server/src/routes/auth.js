const { auth: authController } = require("../controllers");
const router = require("express").Router();

router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

router.get("/");

module.exports = router;