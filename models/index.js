const User = require('./User');
const Event = require('./Event')
const Project = require('./Project');

User.hasMany(Event, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
})

Event.hasMany(User, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL'
});

module.exports = { User, Project };
