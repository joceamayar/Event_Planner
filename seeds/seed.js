const sequelize = require('../config/connection');
const { User, Event, Classification } = require('../models');

const userData = require('./userData.json');
const eventData = require('./test-eventData.json');
// let classificationData = require('./classificationData.json')

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });


  // classificationData = classificationData.filter(item=>item).map(temp=>({ticketmaster_classification_id: temp.id, classification_name: temp.name}))
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

  // loop through classifications and add to database
  for (let i = 0; i < classifications.length; i++) {
    const ticketMasterClassification = classifications[i];

    if (ticketMasterClassification && ticketMasterClassification.id) {
      // add to database
      await Classification.create({
        ticketmaster_classification_id: ticketMasterClassification.id,
        classification_name: ticketMasterClassification.name,
      });
    }
  }
}

const getClassifications = async () => {
  const apiKey = "JGOGxD9wvI61n0xDGKGxCk1HlugeT9LL";
  let url = `https://app.ticketmaster.com/discovery/v2/classifications.json?apikey=${apiKey}`;

  let response = await fetch(url, {
    method: 'GET'
  });
  console.log(response)

  // data coming back from ticket master
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