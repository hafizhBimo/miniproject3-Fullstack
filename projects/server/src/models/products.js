"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.User, { foreignKey: "sellerId" });
      Products.belongsTo(models.Category, { foreignKey: "categoryId" });
      Products.hasMany(models.Cart_items, { foreignKey: "product_id" });
      Products.hasOne(models.Order_items, { foreignKey: "product_id" });
    }
  }
  Products.init(
    {
      sellerId: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      price: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Products",
    }
  );
  return Products;
};
