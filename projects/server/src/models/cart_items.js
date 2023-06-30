"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart_items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart_items.belongsTo(models.User, { foreignKey: "user_id" });
      Cart_items.hasOne(Models.Products, { foreignKey: "product_id" });
    }
  }
  Cart_items.init(
    {
      product_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart_items",
    }
  );
  return Cart_items;
};
