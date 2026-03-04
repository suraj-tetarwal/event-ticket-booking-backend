const sequelize = require("../config/database")
const {DataTypes} = require("sequelize")

const Venue = sequelize.define("Venue", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        location: {
            type: DataTypes.STRING,
            allowNull: false
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: "venues",
        timestamps: true
    }
)

module.exports = Venue