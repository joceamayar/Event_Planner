// API for the app
const router = require('express').Router();
const { Event } = require('../../models');

// todo: get all events for a user from the database
router.get('/events', async (req, res) => {
  try {
    const userId = req.body.user_id; 
    const userData = await Event.findAll({
      where: {
        user_id: userId,
      }
    });
    res.status(200).json(userId);
  } catch (err) {
    res.status(500).json(err);
  }
});


// todo: save events. Save button will send the request here (using fetch).
// user wants to save event found in event search
router.post('/save_event', async (req, res) => {
  try { 
    //validation? 
    const savedEvent = await Event.create({
      user_id: req.body.user_id,
      ticketmaster_id: req.body.ticketmaster_id,
      ticketmaster_url: req.body.ticketmaster_url,
      imageUrl: req.bodyimageUrl,
      name: req.body.name,
      description: req.body.description,
      start_date_time: req.body.start_date_time,
      end_date_time: req.body.end_date_time,
      zip_code: req.body.zip_code,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      classification_id: req.body.classification_id,
    });
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;