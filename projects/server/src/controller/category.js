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
};
