//* API for the app
const router = require('express').Router();
const { Event } = require('../../models');

// gets all events for a user from the database
// http://localhost:3001/api/events?user_id=1
router.get('/', async (req, res) => {
  try {
    const userId = req.query.user_id; //getting user id from url parameters
    const userData = await Event.findAll({
      where: {
        user_id: userId,
      }
    });
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// user wants to save event found in event search
router.post('/', async (req, res) => {
  try {
    //validation? 
    const savedEvent = await Event.create({
      user_id: req.body.user_id,
      ticketmaster_id: req.body.ticketmaster_id,
      ticketmaster_url: req.body.ticketmaster_url,
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      description: req.body.description,
      start_date_time: req.body.start_date_time,
      end_date_time: req.body.end_date_time,
      zip_code: req.body.zip_code,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      classification_id: req.body.classification_id
    });
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;