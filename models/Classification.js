const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Classification extends Model { }

Classification.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ticketmaster_classification_id: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        classification_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'classification',
    }
);

module.exports = Classification;
