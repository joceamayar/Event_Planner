const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', async (req, res) => {
  console.log("hitroute");
  try {
    let response = await fetch(`https://www.eventbriteapi.com/v3/events/search/`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer BP2HM4RTONDYI7FXNUOI' }
    });
    

    let data = await response.json()
    console.log(data)
    let organizations = data.organizations;
    // console.log(organizations)

    res.status(200).json(data);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
