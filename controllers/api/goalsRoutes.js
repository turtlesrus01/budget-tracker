const express = require('express');
const router = express.Router();
const Goals = require('../../models/Goals');

// GET all goals for a user
router.get('/', async (req, res) => {
  try {
    const goals = await Goals.findAll({
      where: { user_id: req.user.id },
    });
    res.json(goals);
    res.render('goals', { goals });
} catch (err) {
    console.err(err);
    res.status(500).json(err)
  }
});

// POST a new goal
router.post('/', async (req, res) => {
  const { name, targetAmount, deadline } = req.body;
  try {
    const newGoal = await Goals.create({
      name,
      targetAmount,
      currentAmount: 0,
      deadline,
      user_id: req.user.id,
    });
    res.json(newGoal);
  
} catch (err) {
    console.err(err);
    res.status(500).json(err)
  }
});

// UPDATE a goal
router.put('/:id', async (req, res) => {
  const { name, targetAmount, currentAmount, deadline, achieved } = req.body;
  try {
    const goal = await Goals.findByPk(req.params.id);
    if (!goal) return res.status(404).send('No goal found');
    goal.name = name || goal.name;
    goal.targetAmount = targetAmount || goal.targetAmount;
    goal.currentAmount = currentAmount || goal.currentAmount;
    goal.deadline = deadline || goal.deadline;
    goal.achieved = achieved || goal.achieved;
    await goal.save();
    res.json(goal);
  
} catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// DELETE a goal
router.delete('/:id', async (req, res) => {
  try {
    const goal = await Goals.findByPk(req.params.id);
    if (!goal) return res.status(404).send('Goal not found');
    if (goal.user_id !== req.user.id) return res.status(401).send('Unauthorized');
    await goal.destroy();
    res.json({ message: 'Goal deleted' });
  
} catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
