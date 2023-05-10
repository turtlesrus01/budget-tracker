const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const apiRoutes = require('./api');
const expensesRoutes = require('./expensesRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes)
router.use('/expenses', expensesRoutes)

module.exports = router;