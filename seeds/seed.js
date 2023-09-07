const sequelize = require('../config/connection');
const { User, Event, Classification } = require('../models');

const userData = require('./userData.json');
const eventData = require('./test-eventData.json');
const classificationData = require('./classificationData.json')
const apiKey = "ooGU8uX0cAG4SM9WQPPlO5iFhuOfdLN2";

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await seedCategories();
  // const categories = await Classification.bulkCreate(classificationData, {
  //   returning: true,
  // });

  const events = await Event.bulkCreate(eventData, {
    returning: true,
  });

  process.exit(0);
};

const seedCategories = async () => {
  let classifications = await getClassifications();

  for (let i = 0; i < classifications.length; i++) {
    const ticketMasterClassification = classifications[i];

    if (ticketMasterClassification && ticketMasterClassification.id) {
      await Classification.create({
        ticketmaster_classification_id: ticketMasterClassification.id,
        classification_name: ticketMasterClassification.name,
      });
    }
  }
}

const getClassifications = async () => {
  let url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

  let response = await fetch(url, {
    method: 'GET'
  });

  let data = await response.json();
  if (data._embedded && data._embedded.classifications) {
   
    let classArr = data._embedded.classifications.map(c => c.segment);
    console.log(classArr)
    return classArr
  } else {
    return [];
  }
}

seedDatabase();