const router = require('express').Router();
const dayjs = require('dayjs')

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


///---------------------Keval's Eventpage Route-----------------------------///
// Keep at bottom of all other event routes
//router.get('/:id', async (req,res)=> {
// localhost:3001/event/get?eventID=Z7r9jZ1AdqwP_
// localhost:3001/event/get?eventID=Z7r9jZ1AdqwP_&classification=..&
router.get(`/get`, async (req,res)=> {
  // get route parameters (see above example route)
  let event_id = req.query.eventID;
  console.log(event_id)

  //let event_id = req.params.id;
  let ticketmaster_classification_id = req.query.ticketmaster_classification_id;
  // let zip_code = req.query.zip_code;
  
  // get events dynamically from ticket master
  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

  // let url = `https://app.ticketmaster.com/discovery/v2/events${event}.json?apikey=${apiKey}`;
  let url = "https://app.ticketmaster.com/discovery/v2/events${event}.json?apikey=${apiKey}";
  if(event_id) {
    url = `https://app.ticketmaster.com/discovery/v2/events/${event_id}.json?apikey=${apiKey}`;
  } 
  
  let response = await fetch(url, {
    method: 'GET'
  });
  
  let data = await response.json()
  let dateFormat = dayjs(data.dates.start.localDate).format('MMMM DD, YYYY')

  res.render('eventpage', {
      event: data.name,
      date: dateFormat,
      address: data._embedded.venues[0].address.line1,
      city: data._embedded.venues[0].city.name,
      state: data._embedded.venues[0].state.name,
      eventID: data.id,
      ticketmaster_url: data.url,
      zip_code: data._embedded.venues[0].postalCode.slice(0,5),
      price: {
          min: data?.priceRanges?.min ? data?.priceRanges?.min : "N/A",
          max: data?.priceRanges?.max ? data?.priceRanges?.min : "N/A"
      }, 
      //Gets first 5 of postal code because it can be more than 5 digits//
      classification_id: data.classifications[0].segment.id,
      venue: data._embedded.venues[0].name,
      imageURL: data.images.find(image => image.ratio==="4_3").url,
      seatMap: data?.seatmap?.staticurl ?  data?.seatmap?.staticurl : "Check Ticketmaster for a SeatMap"
  })
  
  
  // add classification if it was in the route
  
  // if(event_id){
  //   event = `/${event_id}`;
  // }
  
  // // add zip code if it was in the route
  // if (zip_code) {
  //   url += `&postalCode=${zip_code}`;
  // }
  

  
  // fetch data from ticket master
  // let response = await fetch(url, {
  //   method: 'GET'
  // });
  
  // let data = await response.json()


  // if (data._embedded && data._embedded.events) {
  //   let events = data._embedded.events;
    
    // giving back html (This gets the data to render handlebars)
  //   res.render('event', { ticketmaster_classification_id, classification_id, events })
  // } else {
  //   res.render('event', { ticketmaster_classification_id, classification_id })
  // }
})

module.exports = router;