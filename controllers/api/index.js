const router = require('express').Router();
const userRoutes = require('./userRoutes');
const savedEventRoutes = require('./savedEventRoutes');

router.use('/users', userRoutes);
router.use('/events', savedEventRoutes);
module.exports = router;
