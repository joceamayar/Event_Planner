const User = require('./User');
const Event = require('./Event')
const Classification = require('./Classification')

User.hasMany(Event, {
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

Event.hasOne(Classification, {
  foreignKey: 'classification_id',
})


module.exports = { User, Event, Category };
