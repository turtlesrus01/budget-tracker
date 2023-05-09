const sequelize = require("../config/connection");
const { User, Category, Expenses, Goals } = require("../models");

const usersSeedData = [
  { name: "John Doe", email: "johndoe@example.com", password: "password123" },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    password: "password456",
  },
];

const categoriesSeedData = [
  { name: "Groceries", color: "#FFC107" },
  { name: "Rent", color: "#9C27B0" },
  { name: "Utilities", color: "#03A9F4" },
  { name: "Transportation", color: "#4CAF50" },
  { name: "Entertainment", color: "#E91E63" },
  { name: "Miscellaneous", color: "#795548" },
];

const expensesSeedData = [
  {
    description: "Grocery shopping",
    amount: 50,
    user_id: 1,
    category_id: 1,
    date: new Date(),
  },
  {
    description: "Paid rent",
    amount: 1000,
    user_id: 1,
    category_id: 2,
    date: new Date(),
  },
  {
    description: "Electricity bill",
    amount: 50,
    user_id: 1,
    category_id: 3,
    date: new Date(),
  },
  {
    description: "Grocery shopping",
    amount: 70,
    user_id: 2,
    category_id: 1,
    date: new Date(),
  },
  {
    description: "Paid rent",
    amount: 1200,
    user_id: 2,
    category_id: 2,
    date: new Date(),
  },
  {
    description: "Gas bill",
    amount: 30,
    user_id: 2,
    category_id: 4,
    date: new Date(),
  },
];

const goalsSeedData = [
  {
    description: "Groceries budget",
    targetAmount: 500,
    currentAmount: 300,
    deadline: "2023-06-01",
    achieved: false,
    user_id: 1
  },
  {
    description: "Vacation fund",
    targetAmount: 1000,
    currentAmount: 200,
    deadline: "2023-12-31",
    achieved: false,
    user_id: 2
  },
  {
    description: "New laptop",
    targetAmount: 1500,
    currentAmount: 600,
    deadline: "2024-03-15",
    achieved: false,
    user_id: 1
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });
  //creates the categories in the db
  const users = await User.bulkCreate(usersSeedData, {
    individualHooks: true,
    returning: true,
  });
  //creates the categories in the db
  const categories = await Category.bulkCreate(categoriesSeedData, {
    individualHooks: true,
    returning: true,
  });
  //create expenses
  const expenses = await Expenses.bulkCreate(expensesSeedData, {
    individualHooks: true,
    returning: true,
  });
  //create goals
  const goals = await Goals.bulkCreate(goalsSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
