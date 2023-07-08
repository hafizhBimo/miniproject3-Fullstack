const db = require("../models");
const { Sequelize } = require("sequelize");

module.exports = {

    async addItemToCart(req, res) {
      const userId = req.user.id;
  
      const productId = req.params.id;

      const {quantity} = req.body

    try {
      const isExist = await db.Products.findOne({
        where: { id: productId },
      });
      if (!isExist) {
        return res.status(404).send({
          message: "product not found",
        });
      }

      const isExistCart = await db.Cart_items.findOne({
        where: { product_id: productId, user_id: userId },
      });

      const singleProduct = await db.Products.findOne({
        where: { id: productId },
      });

      if(isExistCart){
        isExistCart.quantity = isExistCart.quantity + quantity
        await isExistCart.save();
      }else{
        const newCartProduct = await db.Cart_items.create({
        product_id: productId,
        user_id: userId,
        quantity: quantity
      });}


    res.status(201).send({
        message: "item succesfully added to cart",
        data: singleProduct.name,
    });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

  async getCart(req, res) {
    const userId = req.user.id;

  try {
    const allCart = await db.Cart_items.findAll({
      where: {user_id: userId},
      include: [
        { model: db.Products, attributes: ["name", "price", "imageUrl"], as: "Product" },
        { model: db.User, attributes: ["storeName"], as: "User" },
      ],
    });

  res.status(201).send({
      message: "successfully get all cart items",
      data: allCart,
  });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      error: error.message,
    });
  }
},

  async removeItemfromCart(req, res) {
    const userId = req.user.id;

    cartId = req.params.id

    try {
    
      const removeCartItem = await db.Cart_items.destroy({ 
        where: {id : cartId, user_id: userId}
        });

        const allCart = await db.Cart_items.findAll({
          where: {user_id: userId},
        });
      
    
    res.status(201).send({
        message: "item removed from cart",
        data: allCart
    });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

    async emptyCart(req, res) {
      const userId = req.user.id;

    try {

      const emptyAllCartItems = await db.Cart_items.destroy({ 
        where: {user_id: userId}
        });
      

    res.status(201).send({
        message: "cart emptied",
    });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  
  },

  async checkoutOrder(req, res) {
    const userId = req.user.id;
    const address = req.body.address;

  try {

    const totalCart = await db.Cart_items.findAll({
      where: {user_id: userId},
      include: [
        { model: db.Products, attributes: ["price"], as: "Product" },
      ],
    });
    
    const priceQuantity = totalCart.map(
      (quantity) => quantity.quantity * quantity.Product.price)

    const totalPrice = priceQuantity.reduce((total, n) => total + n, 0)


    const newOrderDetails = await db.Order_details.create({
      user_id: userId,
      total: totalPrice,
      address: address,
    });

    await totalCart.map((cart) => 
        db.Order_items.create({
          order_id: newOrderDetails.id,
          product_id: cart.product_id,
          quantity: cart.quantity,
      }))


    const emptyAllCartItems = await db.Cart_items.destroy({ 
      where: {user_id: userId}
      });

  res.status(201).send({
      message: "order completed",
      data: newOrderDetails,
  });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      error: error.message,
    });
  }
},

  async grossIncome(req, res) {
    const userId = req.user.id;

    const startDate = req.body.startDate
    const endDate = req.body.endDate

    try {

    const grossIncomeDay = await db.Products.findAll({
      where: {sellerId: userId},
      include: [
        { model: db.Order_items, attributes: ["quantity"], as: "Order_item",
        where: {quantity: {[Sequelize.Op.not]: null},
        createdAt: {
          [db.Sequelize.Op.between]: [startDate, endDate],
          }
        }
      },
      ],
      order: [['createdAt', 'ASC']],
    });

    const totalOnly = grossIncomeDay.map(
      (m) => m.price * m.Order_item.quantity)

    const totalPrice = totalOnly.reduce((total, n) => total + n, 0)

  res.status(201).send({
      message: "successfully get gross income by day",
      data: totalPrice,
  });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      error: error.message,
    });
  }
  },


  async totalTransaction(req, res) {
    const userId = req.user.id;

    const startDate = req.body.startDate
    const endDate = req.body.endDate

    try {

    const totalTransactionDay = await db.Order_details.findAndCountAll({
      where: {user_id: userId,
        createdAt: {
          [db.Sequelize.Op.between]: [startDate, endDate],
       },
      },
      include: [
        { model: db.Order_items, attributes: ["product_id", "quantity"], as: "Order_items",
        include: [
          { model: db.Products, attributes: ["name", "price", "imageUrl"], as: "Product" },
        ], },
      ],
      order: [['createdAt', 'ASC']],
    });

  res.status(201).send({
      message: "successfully get all transaction",
      data: totalTransactionDay,
  });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      error: error.message,
    });
  }
  },

}