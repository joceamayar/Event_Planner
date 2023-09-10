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


///-------------------------Eventpage Route-----------------------------///
// Needed a new route for my render page. Instead of putting a bunch of if statements in the above route, this would be cleaner. 
// localhost:3001/event/get?eventID=Z7r9jZ1AdqwP_&classification=..& >>>This is to include both eventID and classification ID in the parameters
router.get(`/:id`, async (req,res)=> {
  // get route parameters (see above example route)
  
  //Just setting the class to Miscellaneous key 
  let classification_id = req.query.classification_id

  //Setting category equal to "Random"
  let category = "Random"

  //Created an array of all the classifications and their associated IDs
  let categoryArr = [
    {
      cat: "Miscellaneous",
      key: "KZFzniwnSyZfZ7v7n1",
      imgKey: "34Xicn82lY4"
    },
    {
      cat: "Sports",
      key: "KZFzniwnSyZfZ7v7nE",
      imgKey: "0B_S1vTY0NU"
    },
    {
      cat: "Music",
      key: "KZFzniwnSyZfZ7v7nJ",
      imgKey: "aWXVxy8BSzc"
    },
    {
      cat: "Arts & Theatre",
      key: "KZFzniwnSyZfZ7v7na",
      imgKey: "gIDMmhKARLk"
    },
    {
      cat: "Undefined",
      key: "KZFzniwnSyZfZ7v7nl",
      imgKey: "yueLIYXDpzw"
    },
    {
      cat: "Film",
      key: "KZFzniwnSyZfZ7v7nn",
      imgKey: "nLl5sJnElxY"
    }
]

    //Finding the category where the classfication_id from the query parameters is equal to the classification key
    let foundCategory = categoryArr.find(category => category.key===classification_id);
    console.log(foundCategory)
   
    //If we find a matching value then get the category name associated with that key
    if(foundCategory){
      category = foundCategory.cat
    }
    else{
      console.log("Category not found")
    }

//---------------------Fetch for Category Banner Image -----------------//

    let unsplashKEY = "Ftv1Z09dCkfC4h_vSuAWUHQL1PRguPeLoejKjjc-1sQ"
    let photoID = foundCategory.imgKey
    let bannerURL;

    let getImageData = async(photoID, unsplashKEY) =>{
      let allImageData = await fetch(`https://api.unsplash.com/photos/${photoID}/?client_id=${unsplashKEY}`, {
      method: "GET"})
      //If the response is okay then get the URL's. If not then try a new KEY
      if (allImageData.ok) {
        let bannerImageData = await allImageData.json()
        bannerURL = bannerImageData.urls.small
        }
      else if(!allImageData.ok){
        unsplashKEY = "3ToKaeZv1WWRFpRIRC6wrqtP0uSlaL4mP1_mjCAlGGw"
        getImageData(photoID, unsplashKEY);
      }
  }

  getImageData(photoID, unsplashKEY)


  //----------------Fetch for Ticketmaster Data---------------//
  //let event_id = req.params.id;
  let event_id = req.params.id;
  //API key for ticketmaster
  const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

  //Setting the url
  let url = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}`;
  
  //If there is an eventID in the parameters then set the url to the one below
  if(event_id) {
    url = `https://app.ticketmaster.com/discovery/v2/events/${event_id}.json?apikey=${apiKey}`;
  } 
  else{
    //Renders wrong route if the eventID is not included in the query parameters//
    res.send("<h1>Wrong Route!</h1>")
  }
  
  //Fetching the data from API for the event
  let response = await fetch(url, {
    method: 'GET'
  });
  
  let data = await response.json()

  //Using dayjs to set the format of the date to the Spelled out Month, Two-digit day, Four-digit year
  let dateFormat = dayjs(data.dates.start.localDate).format('MMMM DD, YYYY')

  res.render('eventpage', {
      //Using the classification id to render the right category name
      classification: category,
      categoryImg: bannerURL,
      event: data.name,
      date: dateFormat,
      address: data._embedded.venues[0].address.line1,
      city: data._embedded.venues[0].city.name,
      state: data._embedded.venues[0].state.name,
      eventID: data.id,
      ticketmaster_url: data.url,
      //Gets first 5 of postal code because it can be more than 5 digits>> For code below//
      zip_code: data._embedded.venues[0].postalCode.slice(0,5),
      //The ? states that if there is NO data and NO priceRanges and NO min/max  in the API info for that event then set that value equal to "N/A" >> Called a ternary operator
      price: {
          min: data?.priceRanges?.min ? data?.priceRanges?.min : "N/A",
          max: data?.priceRanges?.max ? data?.priceRanges?.min : "N/A"
      }, 
      classification_id: data.classifications[0].segment.id,
      venue: data._embedded.venues[0].name,
      imageURL: data.images.find(image => image.ratio==="4_3").url,
      //The ? states that if there is NO data and NO seatmap and NO static curl  in the API info for that event then set that value equal to "Check Ticketmaster for a SeatMAP >> Called a ternary operator"
      seatMap: data?.seatmap?.staticurl ?  data?.seatmap?.staticurl : "Check Ticketmaster for a SeatMap"
  })

})

module.exports = router;