const router = require('express').Router();
const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

// Save an event as a user of event planner
router.post('/',  async (req, res) => {
  // {
  //   "event_id": ""
  // }

  try {
    let eventId = req.query.event_id;
    //todo: figure out who the user is that wants to save this event

    //todo: save this in the database in as a SavedEvent Object

    res.status(200).json(classifications);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
