const { category: authCategory } = require("./../controller");
const router = require("express").Router();

router.get("/categories", authCategory.getAllCategories);
router.post("/new-category", authCategory.addCategory);

module.exports = router;
