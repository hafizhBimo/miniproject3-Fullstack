const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models");
const crypto = require("crypto");

const { User } = db;

const secretKey = process.env.JWT_SECRET_KEY;

module.exports = {
  async register(req, res) {
    const { username, email, password, phoneNumber, storeName } = req.body;
    try {
      const isExist = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [{ username }, { email }, { phoneNumber }],
        },
      });

      if (isExist) {
        res.status(400).send({
          message: "username/email/phone number already registered",
        });
        return;
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create({
        username,
        email,
        phoneNumber,
        password: hashPassword,
        storeName,
      });

      res.status(201).send({
        message: "registration success",
        data: {
          username: newUser.username,
          email: newUser.email,
          phoneNumber: newUser.phoneNumber,
          storeName: newUser.storeName,
        },
      });
    } catch (error) {
      res.status(500).send({
        message: "something wrong in the server",
        errors: error.message,
      });
    }
  },

  async login(req, res) {
    const { user_identification, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          [db.Sequelize.Op.or]: [
            { email: user_identification },
            { phoneNumber: user_identification },
            { username: user_identification },
          ],
        },
      });
      if (!user) {
        return res.status(400).send({
          message: "login failed, incorrect identity/password",
        });
      }

      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        return res.status(400).send({
          message: "login failed, incorrect identity/password",
        });
      }

      const payload = { id: user.id };
      const token = jwt.sign(payload, secretKey, {
        expiresIn: "3h",
      });
      res.send({
        message: "login success",
        data: user,
        accessToken: token,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },
  async keepLogin(req, res) {
    const userId = req.user.id;
    try {
      const user = await User.findOne({
        where: {
          id: userId,
        },
      });
      if (!user) {
        return res.status(400).send({
          message: "user not found",
        });
      }
      res.send({
        message: "keepLogin successful",
        data: user,
      });
    } catch (error) {
      res.status(500).send({
        message: "fatal error on server",
        error: error.message,
      });
    }
  },
};
