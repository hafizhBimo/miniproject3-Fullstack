const db = require("../models");

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
      (quantity, price) => quantity.quantity * quantity.Product.price)

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


}