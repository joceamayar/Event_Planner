//this file is only to create the tables, we can add the saved events to this table. 

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
        // we don't need a saved_event model because we are saving each event to a user here
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
                unique: false
            }
        },
        // if created in the app by the user, this is null
        // if this was saved from ticket master, this is not null and will have the ticketMaster ID
        ticketmaster_id: { 
            type: DataTypes.STRING,
            allowNull: true
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
        city: {
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
                unique: false
            },
        },
        classification_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'classification',
                key: 'id',
                unique: false
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
