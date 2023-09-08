const router = require('express').Router();
const { User, Classification, Event } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs')

router.get('/', async (req, res) => {
  // find classifications 
  let classificationData = await Classification.findAll()
  let classifications = classificationData.map(classification => classification.get({ plain: true }))

  // replace handlebars with classifications
  res.render('homepage', { classifications })
});

// Use withAuth middleware to prevent access to route

router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Event }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Something went wrong:', err);
      req.session.error = 'Logout failed. Please try again.';

      res.redirect('/profile');
    } else {

      res.redirect('/login');
    }
  });
});

router.get('/signup', (req, res) => {

  res.render('signup');
});

//Getting event information based on the event ID that comes from what event is clicked//
router.get('/eventpage/:id', async (req, res) => {
  try {
    const eventData = await Event.findByPk(req.params.id, {
      include: [{ model: Classification }]
    })

    const eventInfo = eventData.get({ plain: true });

    res.render('eventpage', {
      ...eventInfo,
      date: dayjs(eventInfo.start_date_time).format('MM/DD/YYYY'),
      logged_in: req.session.logged_in
    })
    console.log(eventInfo)
  }
  catch (error) {
    console.error('Error fetching event data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router;
