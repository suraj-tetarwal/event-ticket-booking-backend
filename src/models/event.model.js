const { DataTypes } = require("sequelize")
const sequelize = require("../config/database")
const Venue = require("./venue.model")

const Event = sequelize.define("Event",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        eventDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        totalSeats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        availableSeats: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        venueId: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "events",
        timestamps: true
    }
)

Event.belongsTo(Venue, {
  foreignKey: "venueId",
  as: "venue",
  onDelete: "RESTRICT",
  onUpdate: "CASCADE"
});

Venue.hasMany(Event, {
  foreignKey: "venueId"
})

module.exports = Event