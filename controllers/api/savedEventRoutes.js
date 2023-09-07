// probably don't need this file in routes because fetch on fe

const router = require('express').Router();
const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
const SavedEvent = require('./models/SavedEvent');
var jwt = require('jsonwebtoken');
var token = jwt.sign({ foo: 'bar' }, 'shhhhh');

// Save an event as a user of event planner
router.post('/',  async (req, res) => {
  // {
  //   "event_id": ""
  // }

  try {
    let eventId = req.query.event_id;
    const token = req.header('x-auth-token'); // Assume token is sent in the header
       if (!token) {
      return res.status(401).send('Access denied.');
    }

    const decoded = jwt.verify(token, 'jsonwebtoken'); // Replace with your actual JWT secret key
    const userId = decoded._id; // Assume the decoded JWT payload contains the user ID

    //saves new event in the database  as a SavedEvent Object

    const newSavedEvent = new SavedEvent({
      userId,
      eventId,
    });

    await newSavedEvent.save();

    res.status(200).json(classifications);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
