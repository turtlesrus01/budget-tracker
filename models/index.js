//import model files
const User = require('./User');
const Expense = require('./Expense');
const Category = require('./Category');
const Goal = require('./Goal');

//User => Expenses
User.hasMany(Expense, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Expenses => User
Expense.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
//Expenses => Categories
User.hasOne(Expense, {
  foreignKey: 'expense_id',
  onDelete: 'CASCADE'
});
//Category => Expenses
//User => Goals
//Goals => User

module.exports = { User };