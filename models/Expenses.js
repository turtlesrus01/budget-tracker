const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");
const Category = require("./Category");

class Expenses extends Model {}

Expenses.init(
  {
    //expense id
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //expense description
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //expense amount
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //date of this expense
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //user tied to this expense
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    //category tied to this expense
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "expenses",
  }
);

module.exports = Expenses;
