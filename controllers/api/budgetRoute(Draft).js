const express = require('express')
const router = require('express').Router();
const { User } = require('../../models');

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
router.post('users', async (req, res) => {
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
router.put('users/:id', async (req, res) => {
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
  
  module.exports = router;
