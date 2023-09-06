const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./eventRoutes');
const landingPageRoutes = require('./landingPageRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/landingPage', landingPageRoutes);

module.exports = router;
