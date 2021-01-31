"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User_Course.init(
    {
      UserId: DataTypes.UUID,
      CourseId: DataTypes.UUID,
      status: DataTypes.STRING,
      score: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Course",
    }
  );
  return User_Course;
};
