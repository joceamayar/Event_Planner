const router = require('express').Router();

// MVC controller
// Example route: http://localhost:3001/event?classification_id=KZFzniwnSyZfZ7v7n1&zip_code=02169
router.get('/', async (req, res) => {

  // get route parameters (see above example route)
  let classification_id = req.query.classification_id;
  let ticketmaster_classification_id = req.query.ticketmaster_classification_id;
  let zip_code = req.query.zip_code;

  // get events dynamically from ticket master
  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

  // add classification if it was in the route
  if (classification_id) {
    url += `&classificationId=${classification_id}`;
  }

  // add zip code if it was in the route
  if (zip_code) {
    url += `&postalCode=${zip_code}`;
  }

  // fetch data from ticket master
  let response = await fetch(url, {
    method: 'GET'
  });

  let data = await response.json()
  if (data._embedded && data._embedded.events) {
    let events = data._embedded.events;

    // giving back html (This gets the data to render handlebars)
    res.render('event', { ticketmaster_classification_id, classification_id, events })
  } else {
    res.render('event', { ticketmaster_classification_id, classification_id })
  }
});

module.exports = router;