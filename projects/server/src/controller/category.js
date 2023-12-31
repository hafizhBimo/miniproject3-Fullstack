const db = require("../models");

module.exports = {
  async getAllCategories(req, res) {
    try {
      const categories = await db.Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).send({
        message: "list of categories",
        list: categories,
      });
    } catch (errors) {
      res.status(500).send({
        message: "something wrong on the server",
        error: errors.message,
      });
    }
  },

  async addCategory(req, res) {
    const { newCategory } = req.body;
    try {
      const categoryCheck = await db.Category.findOne({
        where: { name: newCategory },
      });
      if (categoryCheck) {
        return res.status(400).send({
          message: "category already exist",
        });
      }
      await db.Category.create({
        name: newCategory,
      });
      res.status(200).send({
        message: "category successfully added",
      });
    } catch (errors) {
      res.status(500).send({
        message: "something wrong on the server",
        error: errors.message,
      });
    }
  },
  async modifyCategory(req, res) {
    const { oldCategory, newCategory } = req.body;
    try {
      const categoryData = await db.Category.findOne({
        where: { name: oldCategory },
      });

      categoryData.name = newCategory;
      await categoryData.save();
      res.status(200).send({
        message:"category successfully modified"
      })
    } catch (error) {
        res.status(500).send({
            message:"something wrong on the server",
            error:error.message
        })
    }
  },
};
