const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const landingPageRoutes = require('./landingPageRoutes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/landingPage', landingPageRoutes);

module.exports = router;
