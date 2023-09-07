const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model { }

Event.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        ticketmaster_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ticketmaster_url: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        start_date_time: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isDate: true,
            }
        },
        end_date_time: {
            type: DataTypes.DATE,
            allowNull: true,
            validate: {
                isDate: true,
            }
        },
        zip_code: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        city:{
            type: DataTypes.STRING,
        },
        state: {
            type: DataTypes.STRING,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        classification_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'classification',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'event',
    }
);

module.exports = Event;
