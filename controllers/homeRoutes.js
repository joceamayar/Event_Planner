const router = require('express').Router();
const { User, Classification, Event, SavedEvent} = require('../models');
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
    let userData = await User.findOne({
      where:{
        id: req.session.user_id
      },
      attributes: { exclude: ['password'] }
    })
    console.log(userData)
    let user = userData.get({plain:true})
    console.log(user)
    let eventData = await Event.findAll({
      where:{
        user_id: userData.id
      }
    })
    console.log(eventData)

    let events = eventData.map(event=> event.get({plain:true}))

    console.log(events)
    console.log(user)
    
    res.render('profile', {
      events, 
      user,
      logged_in: true
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/login', async  (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (await req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  else{
    res.render('login')
  }

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


module.exports = router;
