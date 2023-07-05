const db = require("../models");

module.exports = {

    async addItemToCart(req, res) {
      const sellerId = req.user.id;
  
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

      const singleProduct = await db.Products.findOne({
        where: { id: productId },
      });

      const newCartProduct = await db.Cart_items.create({
        product_id: productId,
        user_id: sellerId,
        quantity: quantity
      });

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

  try {
    const allCart = await db.Cart_items.findAll({
      where: {},
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

async emptyCart(req, res) {

try {

  const emptyAllCartItems = await db.Cart_items.destroy({ 
    where: {}
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


}