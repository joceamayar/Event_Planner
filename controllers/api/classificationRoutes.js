const router = require('express').Router();
const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

router.get('/',  async (req, res) => {
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

    let response = await fetch(url, {
      method: 'GET'
    });

    let data = await response.json()
    
    // get "segment" from classification because that's where we find the id and name
    let classifications = data._embedded.classifications.map(c => c.segment);

    console.log(classifications)

    res.status(200).json(classifications);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
