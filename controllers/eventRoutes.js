const { Classification } = require('../models');
const router = require('express').Router();
const dayjs = require('dayjs')

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

    // giving back html (This gets the data to render handlebars)
    res.render('event', { classification_name, classification_id, zip_code, events })
  } else {
    res.render('event', { classification_name, classification_id, zip_code })

  }
}

// Route handler that calls the wrapper function
router.get('/', async (req, res) => {
  await handleRoutes(req, res);
});



//-------------------------Events Page Route----------------------------//


router.get(`/:id`, async (req, res) => {

  let event_id = req.params.id

  //Category Array with classification_id and imageKey for its background image if it will be used. 
  let categoryArr = [{
    cat: "Miscellaneous",
    key: "1",
    imgKey: "34Xicn82lY4"
  },
  {
    cat: "Sports",
    key: "2",
    imgKey: "0B_S1vTY0NU"
  },
  {
    cat: "Music",
    key: "3",
    imgKey: "aWXVxy8BSzc"
  },
  {
    cat: "Arts & Theatre",
    key: "4",
    imgKey: "gIDMmhKARLk"
  },
  {
    cat: "Undefined",
    key: "5",
    imgKey: "yueLIYXDpzw"
  },
  {
    cat: "Film",
    key: "6",
    imgKey: "nLl5sJnElxY"
  }]

  //Finding category where the key matches the query classification_id value
  let foundCategory =  categoryArr.find(category =>category.key==req.query.classification_id)
  //Setting the category to Miscellaneous by default
  let category = "Miscellaneous";

  //If we find a category setting the name equal to name in the array
if(foundCategory){
   category = foundCategory.cat
}


const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

//API URL for ticketmaster fetch
let ticketMasterURL = `https://app.ticketmaster.com/discovery/v2/events/${event_id}?apikey=${apiKey}`

//Calling the function to fetch the data
fetchTicketMaster(ticketMasterURL)


//Function to fetch ticketmaster data
async function fetchTicketMaster(url){
  let response = await fetch(url, {
    method: "GET"
  })

  let data = await response.json()
  let dateFormatted = dayjs(data.dates.start.localDate).format('MMMM DD, YYYY')
  console.log(dateFormatted)
  let imageURL = data.images.find(image => image.ratio === "4_3").url

  let renderData = {
    classification: category,
    event: data.name,
    date: dateFormatted,
    address: data._embedded.venues[0].address.line1,
    city: data._embedded.venues[0].city.name,
    state: data._embedded.venues[0].state.name,
    eventID: data.id,
    ticketmaster_url: data.url,
    //Gets first 5 of postal code because it can be more than 5 digits>> For code below//
    zip_code: data._embedded.venues[0].postalCode.slice(0, 5),
    //The ? states that if there is NO data and NO priceRanges and NO min/max  in the API info for that event then set that value equal to "N/A" >> Called a ternary operator
    price: {
      min: data?.priceRanges?.min ? data?.priceRanges?.min : "N/A",
      max: data?.priceRanges?.max ? data?.priceRanges?.max : "N/A"
    },
    classification_id: data.classifications[0].segment.id,
    venue: data._embedded.venues[0].name,
    imageURL: imageURL,
    //The ? states that if there is NO data and NO seatmap and NO static curl  in the API info for that event then set that value equal to "Check Ticketmaster for a SeatMAP >> Called a ternary operator"
    seatMap: data?.seatmap?.staticurl ? data?.seatmap?.staticurl : "",
  }

  console.log(renderData)
  
  res.render('eventpage', {
    ...renderData
})

}
})


// --------------------Getting background image for the category (might not be used-------------//
//     let unsplashKEY = "3ToKaeZv1WWRFpRIRC6wrqtP0uSlaL4mP1_mjCAlGGw"
//     let bannerURL;
//     if(foundCategory){
//       category = foundCategory.cat
//       photoID = foundCategory.imgKey

//        bannerURL = await getImageData(photoID, unsplashKEY)
      
//     }
//     else if(!foundCategory){
//       category = "Random"
//       photoID = "34Xicn82lY4"
  
//       console.log("Category not found")

//       bannerURL = await getImageData(photoID, unsplashKEY)
     
//     }
  


    
      //---------------------Fetch for Category Banner Image -----------------//
    async function getImageData(photoID, unsplashKEY){
      let bannerURL;
      let allImageData = await fetch(`https://api.unsplash.com/photos/${photoID}/?client_id=${unsplashKEY}`, {
        method: "GET"})
        //If the response is okay then get the URL's. If not then try a new KEY
        if (allImageData.ok) {
          let bannerImageData = await allImageData.json()
          bannerURL = bannerImageData.urls.small
          return bannerURL
        }
        else if(!allImageData.ok){
          console.log("Function not working")
          return 
  }
}

module.exports = router;
