const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const classificationRoutes = require('./classificationRoutes');

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/classifications', classificationRoutes);
module.exports = router;
