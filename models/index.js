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
//Categories can have many expenses
Category.hasMany(Expenses, {
  onDelete: 'CASCADE',
})
//Expenses belong to a specific category
Expenses.belongsTo(Category, {
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
module.exports = { User, Category, Expenses, Goals };
