const router = require('express').Router();
// const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const classificationRoutes = require('./classificationRoutes');
// const landingPageRoutes = require('./landingPageRoutes')

// router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/classifications', classificationRoutes);
// router.use('/landingPage', landingPageRoutes);

module.exports = router;
