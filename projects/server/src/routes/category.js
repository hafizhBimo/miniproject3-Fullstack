const { category: authCategory } = require("./../controller");
const router = require("express").Router();

router.get("/categories", authCategory.getAllCategories);

module.exports = router;
