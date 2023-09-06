const router = require('express').Router();
const userRoutes = require('./userRoutes');
const eventRoutes = require('./eventRoutes');
const categoriesRoutes = require('./organizationRoutes');
const landingPageRoutes = require('./landingPageRoutes')

router.use('/users', userRoutes);
router.use('/events', eventRoutes);
router.use('/categories', categoriesRoutes);
router.use('/landingPage', landingPageRoutes);

module.exports = router;
