"use strict";

const crypto = require("crypto");
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Car, {
        foreignKey: "createdBy",
        as: "created",
      });

      this.hasMany(models.Car, {
        foreignKey: "updatedBy",
        as: "updated",
      });

      this.hasMany(models.Car, {
        foreignKey: "deletedBy",
        as: "deleted",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: "Please input the correct email format" },
        },
      },
      encryptedPassword: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      role: {
        allowNull: false,
        type: DataTypes.ENUM("SUPERADMIN", "ADMIN", "MEMBER"),
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((user) => (user.id = crypto.randomUUID()));
  return User;
};
