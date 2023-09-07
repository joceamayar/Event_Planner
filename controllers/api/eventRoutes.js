const router = require('express').Router();
// const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
// const { Project, User } = require('../models');


// this file is for the api/events routes that will get fetched from the public *.js file
// == every route in here interatcting with database for the events table
// get all events for a user
// /api/events/
router.get('/', async (req, res) => {
  try {

    const eventsData = await Event.findAll({
      where: {
        user_id: req.session.user_id
      }
    });


    console.log(eventsData)
    res.status(200).json(eventsData);

  } catch (err) {
    console.log(err)
    res.status(400).json(err);
  }
});

// router.get('/', async (req, res) => {
  // {
  //   "classification": "123456",
  //   "zip_code": "01679",
  //   "start_time": "2023-09-15",
  // }
  // database stuff
  // find in events table all events where user_id: req.session.user_id
/*
  try {
    let classification = req.query.classification;
    let zip_code = req.query.zip_code;
    let start_time = req.query.start_time;

    let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

    if (classification) {
      url += `&classificationId=${classification}`;
    }

    if (zip_code) {
      url += `&postalCode=${zip_code}`;
    }

    if (start_time) {
      url += `&localStartDateTime=${start_time}`;
    }

    let response = await fetch(url, {
      method: 'GET'
    });

    let data = await response.json()
    let events = data._embedded.events;
    console.log(events)

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json(err);
  }
});

*/

module.exports = router;
