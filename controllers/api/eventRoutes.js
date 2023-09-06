const router = require('express').Router();
const withAuth = require('../../utils/auth');

router.get('/:organizationId', withAuth, async (req, res) => {
  try {
    const orgId = req.params.organizationId

    let response = await fetch(`https://www.eventbriteapi.com/v3/organizations/${orgId}/events/`, {
      method: 'GET',
      headers: { 'Authorization': 'Bearer BP2HM4RTONDYI7FXNUOI' }
    });

    let data = await response.json()
    let events = data.events;
    console.log(events)

    res.status(200).json(events);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
