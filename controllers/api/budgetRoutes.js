const router = require('express').Router();
const { User, Expenses, Category } = require('../../models');
const withAuth = require('../../utils/auth');
const { Sequelize } = require('sequelize');


//User CRUD methods
// GET all users 
router.get('/users', async (req, res) => {
    try{
        const users = await User.findAll();
        res.json(users);
        
      } catch (err) {
        console.error(err);
        res.status(500).json(err);

    }
});

// GET user by ID
router.get('users/:id', async (req,res) => {
    try {
     const user = await User.findByPk(req.params.id);
     if (!user) return res.status(404).json({message: 'No user found'});
     res.json(user);
   
    }  catch (err) {
    console.err(err);

    res.status(500).json(err);

        
    }
});

// Create new user
router.post('/users', async (req, res) => {
    const { username, password, email } = req.body
    try {
     const newUser = await User.create({ username, password, email});
     res.json({ message: 'User account created succesfully!', id: newUser.id});   
        
    } catch (err) {
        console.err(err);
    res.status(500).json(err);

    }
});

// Update user by ID
router.put('/users/:id', async (req, res) => {
    const { username, password, email } = req.body;
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'Account not found' });
      user.username = username;
      user.password = password;
      user.email = email;
     
      await user.save();
      res.json({ message: 'Account updated successfully!', id: user.id });
    
    } catch (err) {
      console.err(err);
      res.status(500).json(err);
    }

});

// DELETE a user by ID
router.delete('/users/:id', async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      await user.destroy();
      res.json({ message: 'User deleted successfully!', id: user.id });
   
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

//Dashboard  
//Get route for dashboard data
router.get('/dashboard', withAuth, async (req, res) => {
  try{
  //query db to get data
  console.log(req.session.user_id);
  const userId = req.session.user_id;
  const dashData = await Expenses.findAll({
    where: { user_id: userId },  
    attributes: [
      //Sequelize function to add all expenses in variable total amount 
      [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_amount']
    ],
    //include data from Category and User models
    include: [
      {
        model: Category,
        attributes: ['color']
      },
      {
        model: User,
        attributes: ['user_id']
      }
    ],
    //Group all expenses by Category
    group: ['category_id'],
    raw: true,
  })
  if (!dashData.length) {
    return res.status(400).json({ error: "Expenses not found" });
  }
  //variable to store the data
  const dashboard = dashData.map((dash) => dash.get({ plain: true }));
  //render dashboard
  res.render('dashboard', {
    title: 'dashboard',
    dashboard,
    logged_in: req.session.logged_in,
  });
  } catch (err) {
    res.status(500).json(err);
  }
});
  
  module.exports = router;
