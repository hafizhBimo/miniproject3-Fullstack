const { category: categoryController } = require("./../controller");
const router = require("express").Router();
const authMiddleware = require("../middleware/auth");

router.get("/categories", categoryController.getAllCategories);
router.post(
  "/new-category",
  authMiddleware.verifyToken,
  categoryController.addCategory
);
router.patch(
  "/modify-category",
  authMiddleware.verifyToken,
  categoryController.modifyCategory
);

module.exports = router;
