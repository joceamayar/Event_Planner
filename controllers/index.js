const router = require('express').Router();
const apiRoutes = require('./api/index');
const homeRoutes = require('./homeRoutes');
const eventRoutes = require('./eventRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/event', eventRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
  });

module.exports = router;
