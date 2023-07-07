'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Products, 
        { foreignKey: "sellerId"});
      User.hasMany(models.Order_details, 
        { foreignKey: "user_id"});
    }
  }
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    storeName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};