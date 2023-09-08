const router = require('express').Router();
const { Classification } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const classifications = await Classification.findAll();
    res.status(200).json(classifications);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;