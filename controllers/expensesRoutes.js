const router = require('express').Router();
const { Expenses} = require('../models');
const withAuth = require('../utils/auth');


// Create a new expense
router.post("/expenses", withAuth, async (req, res) => {
    try {
      const { amount, user_id, category_id } = req.body;
      const expense = await Expenses.create({ amount, user_id, category_id });
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({err});
    }
  });
  
  // Get all expenses
  router.get("/expenses", withAuth, async (req, res) => {
    try {
      const expenses = await Expenses.findAll();
      res.json(expenses);
    } catch (error) {
      res.status(500).json({err});
    }
  });
  
  // Delete an expense
  router.delete("/expenses/:id", withAuth, async (req, res) => {
    try {
      const expenseId = req.params.id;
      await Expenses.destroy({ where: { id: expenseId } });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({err});
    }
  });
  
  module.exports = router;




















































module.exports = router;