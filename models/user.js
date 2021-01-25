"use strict";
const { Model } = require("sequelize");

let { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      fullname: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "fullname cant be empty",
          },
          len: {
            args: [0, 50],
            message: "name must less than 50 characters",
          },
        },
      },
      profile_image: DataTypes.STRING,
      phone_number: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "phone number cant be",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "email cant be empty",
          },
          isEmail: {
            message: "not email formated",
          },
        },
      },
      gender: DataTypes.STRING,
      class: DataTypes.STRING,
      coins: DataTypes.INTEGER,
      school: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "school cant be empty",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "password cant be empty",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      hooks: {
        beforeCreate(instance) {
          instance.password = hashPassword(instance.password);
          instance.role = "user";
          instance.coins = 0;
          instance.mbti = "none";
        },
      },
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
