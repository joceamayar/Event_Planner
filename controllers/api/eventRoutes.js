// API for the app

const router = require('express').Router();
const { Event } = require('../../models');

// todo: get all events for a user from the database
router.get('/events', async (req, res) => {
  let events = [];

  // figure out which user is requesting this data
  // get events for the user_id
  
  res.status(200).json(events);
});


// todo: save events. Save button will send the request here (using fetch).
// user wants to save event found in event search
router.post('/save_event', async (req, res) => {
  // ticket master event
  // let event = {
  //   id: "", //ticketmaster id
  //   name: ''
  // }

  let event = req.body.event;

  // find user who called this route
  let newEvent = await Event.create({
    user_id: "", //figure out which user wants to save this event
    ticketmaster_id: event.id,
    name: event.name
    // todo: add rest of event data here
  });

  console.log(newEvent);
  res.status(200).json(newEvent);
});

module.exports = router;