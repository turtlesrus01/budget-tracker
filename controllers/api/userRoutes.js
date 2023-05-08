const router = require('express').Router();
const { User } = require('../../models');
const withAuth = require('../../utils/auth');

// User login
router.post('/login', withAuth, async (req, res) => {
  try {
    //Query request for the user email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //Query request for the user email
    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }
    //Saving the session and changing logged_in state
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// User logout 
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// User signup
router.post('/signup', async (req, res) => {

try {

  const { name, email, password } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
  });

  res.status(200).json(newUser);
} catch (err) {
  
  res.status(400).json(err);
}
});

module.exports = router;