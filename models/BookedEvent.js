const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// create our Trip model
class BookedEvent extends Model {}

// create fields/columns for Trip model
BookedEvent.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
        unique: false
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'event',
        key: 'id',
        unique: false
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'bookedEvent'
  }
);

module.exports = BookedEvent;
