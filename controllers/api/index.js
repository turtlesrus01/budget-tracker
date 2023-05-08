const router = require('express').Router();
const userRoutes = require('./usersRoutes');



router.use('/users', userRoutes);



module.exports = router;
