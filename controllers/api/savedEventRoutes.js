//* API for the app
const router = require('express').Router();
const { Event } = require('../../models');
const withAuth = require('../../utils/auth')
const dayjs = require('dayjs')

// gets all events for a user from the database
// http://localhost:3001/api/events?user_id=1
router.get('/', withAuth, async (req, res) => {
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
router.post('/', withAuth, async (req, res) => {
  try { 
    //validation? 
    const savedEvent = await Event.create({
      user_id: req.session.id,
      ticketmaster_id: req.body.ticketmaster_id,
      ticketmaster_url: req.body.ticketmaster_url,
      imageUrl: req.body.imageUrl,
      name: req.body.name,
      start_date_time: req.body.start_date_time,
      zip_code: req.body.zip_code,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      classification_id: req.body.classification_id
    });
    res.status(200).json(savedEvent);
  } catch (err) {
    res.status(400).json({message:"Couldn't save", err});
  }
});

//--------------To get event info for saving purposes--------------//
router.get('/:id', async (req,res) =>{
  
  let event_id = req.params.id
  console.log(event_id)

  

  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
  let ticketmasterURL = `https://app.ticketmaster.com/discovery/v2/events/${event_id}?apikey=${apiKey}`
  console.log(ticketmasterURL)
  let response = await fetch(ticketmasterURL, {
    method: "GET"
  })

  let data = await response.json()
  let imageURL = data.images.find(image => image.ratio === "4_3").url

  let saveData = {
    ticketmaster_id: data.id,
    ticketmaster_url: data.url,
    start_date_time: data.dates.start.localDate,
    imageURL: imageURL,
    name: data.name,
    date: data.dates.start.localDate,
    //Gets first 5 of postal code because it can be more than 5 digits>> For code below//
    zip_code: data._embedded.venues[0].postalCode.slice(0, 5),
    address: data._embedded.venues[0].address.line1,
    city: data._embedded.venues[0].city.name,
    state: data._embedded.venues[0].state.name,
    classification_id: data.classifications[0].segment.id,
  }

  res.send(saveData)
}


)

module.exports = router;