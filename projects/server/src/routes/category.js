const { category: categoryController } = require("./../controller");
const router = require("express").Router();

router.get("/categories", categoryController.getAllCategories);
router.post("/new-category", categoryController.addCategory);
router.patch("/modify-category", categoryController.modifyCategory);

module.exports = router;
