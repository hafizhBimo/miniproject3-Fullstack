const db = require("../models");
const {
  setFromFileNameToDBValue,
  getFilenameFromDbValue,
  getAbsolutePathPublicFile,
  convertFromDBtoRealPath,
} = require("../utils/file");
const fs = require("fs");
const { Sequelize } = require('sequelize');

module.exports = {

    async createProductListing(req, res) {
        const sellerId = req.user.id;
        // const categoryId = req.body.categoryId;
        const { name, description, price } = req.body;
        const imageUrl = setFromFileNameToDBValue(req.file.filename);
        try {
          const newProductListing = await Blog.create({ 
            name, description, price,
            sellerId,
            imageUrl,
            // categoryId
            });
          res.status(201).send({
            message: "product listing successful",
            data: newProductListing,
          });
        } catch (errors) {
          res.status(500).send({
            message: "fatal error on server",
            errors,
          });
        }
      },

}