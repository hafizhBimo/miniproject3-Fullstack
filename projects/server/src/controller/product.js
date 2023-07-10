const db = require("../models");
const {
  setFromFileNameToDBValue,
  getFilenameFromDbValue,
  getAbsolutePathPublicFile,
  convertFromDBtoRealPath,
} = require("../utils/file");
const fs = require("fs");
const { Sequelize } = require("sequelize");

module.exports = {
  async createProductListing(req, res) {
    const sellerId = req.user.id;
    console.log(req.user);
    const { name, description, price, categoryId } = req.body;
    const status = true

    const imageUrl = setFromFileNameToDBValue(req.file.filename);
    try {
      const newProductListing = await db.Products.create({
        name,
        description,
        price,
        sellerId,
        imageUrl,
        categoryId,
        status
      });
      res.status(201).send({
        message: "product listing successful",
        data: newProductListing,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

  async ModifyProductListing(req, res) {
    const userId = req.user.id;
    const modifyId = req.params.id;

    const { name, description, price, categoryId } = req.body;

    try {
      const isExist = await db.Products.findOne({
        where: { id: modifyId },
      });
      if (!isExist) {
        return res.status(404).send({
          message: "product listing not found",
        });
      }

      const productData = await db.Products.findOne({
        where: {
          id: modifyId,
        },
      });

      if (productData.sellerId !== userId) {
        return res.status(400).send({
          message: "cannot modify product listing that is not yours",
        });
      }

      if (name) {
        productData.name = name;
      }

      if (description) {
        productData.description = description;
      }

      if (price) {
        productData.price = price;
      }

      if (req.file) {
        productData.imageUrl = setFromFileNameToDBValue(req.file.filename);
      }

      if (categoryId) {
        productData.categoryId = categoryId;
      }

      await productData.save();

      res.status(201).send({
        message: "modify product listing successful",
        data: productData,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

  async modifyProductStatus(req, res) {
    const userId = req.user.id;
    const modifyId = req.params.id;

    const status = req.body.status;

    try {
      const isExist = await db.Products.findOne({
        where: { id: modifyId },
      });
      if (!isExist) {
        return res.status(404).send({
          message: "product listing not found",
        });
      }

      const productData = await db.Products.findOne({
        where: {
          id: modifyId,
        },
      });

      if (productData.sellerId !== userId) {
        return res.status(400).send({
          message: "cannot deactivate/activate product listing that is not yours",
        });
      }

      productData.status = status;

      await productData.save();

      res.status(201).send({
        message: "modify product status succcessful",
        data: productData.status,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

  async getAllProduct(req, res) {
    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 9,
      search: req.query.search || undefined,
      sortBy: req.query.sort || "createdAt",
      sortOrder: req.query.order || "desc",
      categoryId: req.query.categoryId || undefined,
      name: req.query.name || undefined,
    };

    try {
      let where = {};

      if (pagination.search) {
        where[db.Sequelize.Op.or] = [
          {
            "$user.username$": {
              [db.Sequelize.Op.like]: `%${pagination.search}%`,
            },
          },
          { name: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
          { description: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
        ];
      }

      if (pagination.categoryId) {
        where.categoryId = pagination.categoryId;
      }

      if (pagination.name) {
        where.name = { [db.Sequelize.Op.like]: `%${pagination.name}%` };
      }

      where.status = true;

      const { count, rows } = await db.Products.findAndCountAll({
        where,
        include: [
          { model: db.User, attributes: ["username"], as: "User" },
          { model: db.User, attributes: ["storeName"], as: "User" },
          { model: db.Category, attributes: ["name"], as: "Category" },
        ],
        order: [[pagination.sortBy, pagination.sortOrder]],
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      });

      if (pagination.search && count === 0) {
        return res.status(404).send({
          message: "No products found matching the search query.",
        });
      }
      // const order = []
      // for (count sort in pagination.sortBy){
      //   order.push([sort, pagination.sortBy[sort]])
      // }

      const totalPages = Math.ceil(count / pagination.perPage);

      res.send({
        message: "Successfully retrieved products.",
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalPages: totalPages,
          totalData: count,
        },
        data: rows,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        message: "An error occurred while processing the request.",
        error: error.message,
      });
    }
  },

  async getMyProduct(req, res) {

    const userId = req.user.id;

    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 9,
      search: req.query.search || undefined,
      sortBy: req.query.sort || "createdAt",
      sortOrder: req.query.order || "desc",
      categoryId: req.query.categoryId || undefined,
      name: req.query.name || undefined,
    };

    try {
      let where = {};

      if (pagination.search) {
        where[db.Sequelize.Op.or] = [
          {
            "$user.username$": {
              [db.Sequelize.Op.like]: `%${pagination.search}%`,
            },
          },
          { name: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
          { description: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
        ];
      }

      if (pagination.categoryId) {
        where.categoryId = pagination.categoryId;
      }

      if (pagination.name) {
        where.name = { [db.Sequelize.Op.like]: `%${pagination.name}%` };
      }

      where.sellerId = userId;

      const { count, rows } = await db.Products.findAndCountAll({
        where,
        include: [
          { model: db.User, attributes: ["username"], as: "User" },
          { model: db.Category, attributes: ["name"], as: "Category" },
        ],
        order: [[pagination.sortBy, pagination.sortOrder]],
        limit: pagination.perPage,
        offset: (pagination.page - 1) * pagination.perPage,
      });

      if (pagination.search && count === 0) {
        return res.status(404).send({
          message: "No products found matching the search query.",
        });
      }
      // const order = []
      // for (count sort in pagination.sortBy){
      //   order.push([sort, pagination.sortBy[sort]])
      // }

      const totalPages = Math.ceil(count / pagination.perPage);

      res.send({
        message: "Successfully retrieved products.",
        pagination: {
          page: pagination.page,
          perPage: pagination.perPage,
          totalPages: totalPages,
          totalData: count,
        },
        data: rows,
      });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).send({
        message: "An error occurred while processing the request.",
        error: error.message,
      });
    }
  },

  async singlePageProduct(req, res) {
    const productId = req.params.id;

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
        include: [
          { model: db.User, attributes: ["username"], as: "User" },
          { model: db.Category, attributes: ["name"], as: "Category" },
        ],
      });

      res.status(201).send({
        message: "single page displayed",
        data: singleProduct,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },

  async topSellingProduct(req, res) {

    const pagination = {
      page: Number(req.query.page) || 1,
      perPage: Number(req.query.perPage) || 9,
      search: req.query.search || undefined,
      sortBy: req.query.sort || "createdAt",
      sortOrder: req.query.order || "desc",
      categoryId: req.query.categoryId || undefined,
      name: req.query.name || undefined,
    };

    let where = {};

      if (pagination.search) {
        where[db.Sequelize.Op.or] = [
          {
            "$user.username$": {
              [db.Sequelize.Op.like]: `%${pagination.search}%`,
            },
          },
          { name: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
          { description: { [db.Sequelize.Op.like]: `%${pagination.search}%` } },
        ];
      }

      if (pagination.categoryId) {
        where.categoryId = pagination.categoryId;
      }

      if (pagination.name) {
        where.name = { [db.Sequelize.Op.like]: `%${pagination.name}%` };
      }

      where.status = true;

    try {

    const topSelling = await db.Products.findAll({
      where,
      include: [
        { model: db.Category, attributes: ["name"], as: "Category"},
        { model: db.User, attributes: ["storeName"], as: "User"},
        { model: db.Order_items, attributes: ["quantity", "order_id"], as: "Order_item",
          where: {order_id: {[Sequelize.Op.not]: null} }},
      ],
    });

    const totalTopSelling = []

    topSelling.forEach(item => {

      var newItem = {
        id: item.id, 
        name: item.name, 
        imageUrl: item.imageUrl,
        price: item.price,
        category: item.Category.name,
        storeName: item.User.storeName,
        quantity: item.Order_item.quantity,
      };
      topSelling.forEach(innerItem => {
        if(innerItem.id == item.id && 
          innerItem.Order_item.order_id !== item.Order_item.order_id){
            newItem.quantity = newItem.quantity + innerItem.Order_item.quantity;
  
        }
      })
     totalTopSelling.push(newItem);
   });

   function removeDuplicates(array, property) {
    return array.filter((item, index, self) => {
      const value = item[property];
      return index === self.findIndex((obj) => obj[property] === value);
    });
  }

  const uniqueTopSelling = removeDuplicates(totalTopSelling, "id");

  function compare( a, b ) {
    if ( a.quantity > b.quantity ){
      return -1;
    }
    if ( a.quantity < b.quantity ){
      return 1;
    }
    return 0;
  }
  
  uniqueTopSelling.sort(compare);

  res.status(201).send({
      message: "successfully get all top selling products",
      data: uniqueTopSelling,
  });
  } catch (error) {
    res.status(500).send({
      message: "fatal error on server",
      error: error.message,
    });
  }
  },
};
