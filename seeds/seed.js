const sequelize = require('../config/connection');
const { User, Event, Classification } = require('../models');

const userData = require('./userData.json');
const eventData = require('./test-eventData.json');
const classificationData = require('./classificationData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const categories = await Classification.bulkCreate(classificationData, {
    returning: true,
  });
  
  const events = await Event.bulkCreate(eventData, {
    returning: true,
  });

  

  process.exit(0);
};

seedDatabase();
