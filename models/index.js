const User = require('./User');
const Event = require('./Event')
const Category = require('./Category')


User.belongsToMany(Event, {
  through: {
    model: 'bookedEvent',
    unique: false
  },
});

Event.belongsToMany(User, {
  // Define the third table needed to store the foreign keys
  through: {
    model: 'bookedEvent',
    unique: false
  },
})

Category.hasMany(Event, {
  foreignKey: 'category_id'
})

Event.hasOne(Category, {
  foreignKey: 'category_id',
})


module.exports = { User, Event, Category };
