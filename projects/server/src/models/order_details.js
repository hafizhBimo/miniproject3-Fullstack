'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order_details.belongsTo(models.User, 
        { foreignKey: "user_id"}),
      Order_details.hasMany(models.Order_items, { foreignKey: "order_id" });
    }
  }
  Order_details.init({
    user_id: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    address: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Order_details',
  });
  return Order_details;
};