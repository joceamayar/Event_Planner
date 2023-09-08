const router = require('express').Router();

// mvc
//route: http://localhost:3001/event?classification_id=KZFzniwnSyZfZ7v7n1
router.get('/', async (req, res) => {

  // find events
  let classification = req.query.classification_id;
  let zip_code = req.query.zip_code;

  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

  if (classification) {
    url += `&classificationId=${classification}`;
  }

  if (zip_code) {
    url += `&postalCode=${zip_code}`;
  }

  let response = await fetch(url, {
    method: 'GET'
  });

  let data = await response.json()
  let events = data?._embedded?.events || [];

  // giving back html
  res.render('event', { classification, events })
});

module.exports = router;