const User = require('./User');
const Event = require('./Event')
const Classification = require('./Classification')

User.belongsToMany(Event, {
  through: {
    model: 'savedEvent',
    unique: false
  },
});

Event.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: 'savedEvent',
    unique: false
  },
})

Classification.hasMany(Event, {
  foreignKey: 'classification_id'
})

Event.belongsTo(Classification, {
  foreignKey: 'classification_id',
})


module.exports = { User, Event, Classification };
