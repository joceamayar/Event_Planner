const { Classification } = require('../models');
const router = require('express').Router();

// Wrapper function to handle routes
async function handleRoutes(req, res) {
  // Dynamically import 'node-fetch' as an ESM module
  const { default: fetch } = await import('node-fetch');

  // Function to format a date as MM/DD/YYYY
  function formatDate(date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
  }

  // get route parameters (see above example route)
  let zip_code = req.query.zip_code;

  // get classification from the database
  let classification_id = req.query.classification_id;
  const classification = await Classification.findByPk(classification_id);
  const classification_name = classification.classification_name;

  // get events dynamically from Ticketmaster
  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;

  // add Ticketmaster classification id stored from the database
  if (classification.ticketmaster_classification_id) {
    url += `&classificationId=${classification.ticketmaster_classification_id}`;
  }

  // add zip code if it was in the route
  if (zip_code) {
    url += `&postalCode=${zip_code}`;
  }

  // Fetch data from Ticketmaster
  let response = await fetch(url, {
    method: 'GET'
  });

  let data = await response.json()
  if (data._embedded && data._embedded.events) {
    let events = [];

    let ticketMasterEvents = data._embedded.events;
    for (let i = 0; i < ticketMasterEvents.length; i++) {
      const event = ticketMasterEvents[i];

      // Format the start_date using the formatDate function
      const formattedStartDate = formatDate(new Date(event.dates.start.dateTime));

      events.push({
        classification_id: classification_id,
        id: event.id,
        name: event.name,
        imageUrl: event.images[0].url,
        start_date: formattedStartDate,
      });
    }

    // Render the Handlebars template with the formatted data
    res.render('event', { classification_name, events });
  } else {
    res.render('event', { classification_name });
  }
}

// Route handler that calls the wrapper function
router.get('/', async (req, res) => {
  await handleRoutes(req, res);
});

module.exports = router;
