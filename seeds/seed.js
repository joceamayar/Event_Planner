const sequelize = require('../config/connection');
const { User, Event, Classification } = require('../models');

const userData = require('./userData.json');
const eventData = require('./test-eventData.json');
const categoryData = require('./categoryData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const events = await Event.bulkCreate(eventData, {
    returning: true,
  });

  const categories = await Classification.bulkCreate(categoryData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
