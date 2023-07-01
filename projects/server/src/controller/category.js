const db = require("../models");

module.exports = {
  async getAllCategories(req, res) {
    try {
      const categories = await db.Category.findAll({
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      res.status(200).send({
        message: "list of categories",
        data: categories,
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
      const addCategory = await db.Category.findOrCreate({
        where: { name: newCategory },
        defaults: {
          name: newCategory,
        },
      });
      if (addCategory) {
        return res.status(400).send({
          message: "this category's name already exist",
        });
      }
      return res.status(200).send({
        message: "new category successfully added",
        data: addCategory,
      });
    } catch (errors) {
      res.status(500).send({
        message: "something wrong on the server",
        error: errors.message,
      });
    }
  },
};
