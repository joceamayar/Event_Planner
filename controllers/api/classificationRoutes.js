const router = require('express').Router();
const { Classification } = require('../../models');
const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";
const fetch = require('node-fetch');

router.get('/', async (req, res) => {
  try {
    let url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

    let response = await fetch(url, {
      method: 'GET'
    });

    let data = await response.json();

    if (data._embedded && data._embedded.classifications) {
      let classifications = data._embedded.classifications.map(c => c.segment);

      for (let i = 0; i < classifications.length; i++) {
        const element = classifications[i];
        const categoryData = await Classification.create({
          ticketmaster_classification_id: element.id,
          classification_name: element.name,
        });
      }
      res.status(200).json(categoryData);
    } else {
      res.status(404).json({ message: 'No classifications found' });
    }
  } catch (err) {
    res.status(400).json(err);
  }
});


