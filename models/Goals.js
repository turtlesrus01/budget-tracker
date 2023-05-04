const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Goals extends Model {};

Goals.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    //Name of goal
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //Amount to reach for goal
    targetAmount: {
      //decimal datatype with 10 character length and 2 digit decimal places
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    //Current amount in budget
    currentAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    //Date deadline for goal
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    //True or false if goal has been reached
    achieved: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    //referenced to the specific User
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "goals",
  }
);

module.exports = Goals;
