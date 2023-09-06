const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    let response = await fetch(`https://www.eventbriteapi.com/v3/users/me/organizations/`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer BP2HM4RTONDYI7FXNUOI' }
    });
    

    let data = await response.json()
    let organizations = data.organizations;
    console.log(organizations)

    res.status(200).json(organizations);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
