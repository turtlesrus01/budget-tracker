//import model files
const User = require("./User");
const Expenses = require("./Expenses");
const Category = require("./Category");
const Goals = require("./Goals");

//User can have many Expenses
User.hasMany(Expenses, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
//Expenses have one User
Expenses.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
//Each expense has one Category
Expenses.hasOne(Category, {
  foreignKey: "category_id",
  onDelete: "CASCADE",
});
//Category is related to Expenses
Category.belongsTo(Expenses, {
  foreignKey: "expense_id",
  onDelete: "CASCADE",
});
//User can have many Goals
User.hasMany(Goals, {
  foreignKey: "goal_id",
  onDelete: "CASCADE",
});
//Goals are tied to one User
Goals.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
//export classes
module.exports = { User, Category, Expense, Goals };
