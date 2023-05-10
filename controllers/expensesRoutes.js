const router = require("express").Router();
const { Expenses } = require("../models");
const withAuth = require("../utils/auth");

// Create a new expense
router.post("/", withAuth, async (req, res) => {
  try {
    const { amount, user_id, category_id } = req.body;
    const expense = await Expenses.create({ amount, user_id, category_id });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ err });
  }
});

// Get all expenses for a specific user
router.get("/:id", withAuth, async (req, res) => {
  try {
    console.log(req.params.id);
    const expenseId = req.params.id;
    const expenses = await Expenses.findAll({
      where: { id: expenseId, user_id: req.session.user_id },
      raw: true,
    });
    if (!expenses.length) {
      return res.status(400).json({ error: "Expenses not found" });
    }

    res.json(expenses);
    //res.render('expenses', { expenses });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// // Get a single expense by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const expense = await Expenses.findByPk(req.params.id, { raw: true });
//     console.log(expense);
//     if (!expense) {
//       return res.status(404).json({ message: "Expense not found" });
//     }
//     res.json(expense);
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// });

// Delete an expense
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expenses.destroy({ where: { id: expenseId } });
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ err });
  }
});

module.exports = router;
