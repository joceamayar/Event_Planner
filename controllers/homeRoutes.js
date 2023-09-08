const router = require('express').Router();
const { Project, User, Classification, Event } = require('../models');
const withAuth = require('../utils/auth');
const dayjs = require('dayjs')

router.get('/', async (req, res) => {
  //find classifications 
  let classificationData = await Classification.findAll()
  let classifications = classificationData.map(classification => classification.get({ plain: true }))

  res.render('homepage', { classifications })
});

router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
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
