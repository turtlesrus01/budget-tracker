const router = require('express').Router();
const userRoutes = require('./userRoutes');
const expensesRoutes = require('./expensesRoutes');
const homeRoutes = require('./homeRoutes');

router.use('/home', homeRoutes);
router.use('/users', userRoutes);
router.use('/expenses', expensesRoutes)


module.exports = router;
