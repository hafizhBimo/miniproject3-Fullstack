const { auth: authController } = require("./../controller");
const router = require("express").Router();

router.post(
  "/register",
  authController.register
);

router.post(
  "/login",
  authController.login
);

// router.get("/");

module.exports = router;