const {Op} = require("sequelize")

const Venue = require("../../../models/venue.model")

async function createVenue(data) {
    const {name, location, capacity} = data

    const normalizedName = name.toLowerCase()
    const normalizedLocation = location.toLowerCase()

    const existingVenue = await Venue.findOne({where: {name: normalizedName, location: normalizedLocation}})

    if (existingVenue) {
        const error = new Error("Venue already exists at this location")
        error.statusCode = 409
        throw error
    }

    const venue = await Venue.create({
        name: normalizedName,
        location: normalizedLocation,
        capacity
    })

    return {
        id: venue.id,
        name: venue.name,
        location: venue.location,
        capacity: venue.capacity
    }
}

async function getAllVenues() {
    const venues = await Venue.findAll({
        attributes: ["id", "name", "location", "capacity"],
        raw: true
    })

    return {
        count: venues.length,
        venues: venues
    }
}

async function getVenueById(venueId) {
    const parsedVenueId = Number(venueId)

    if (Number.isNaN(parsedVenueId) || parsedVenueId <= 0) {
        const error = new Error("Invalid venue id")
        error.statusCode = 400
        throw error
    }

    const venue = await Venue.findByPk(parsedVenueId, {
        attributes: ["id", "name", "location", "capacity"]
    })

    if (!venue) {
        const error = new Error("Venue not found")
        error.statusCode = 404
        throw error
    }

    return venue
}

async function updateVenue(updateData, venueId) {
    const parsedVenueId = Number(venueId)
    if (Number.isNaN(parsedVenueId) || parsedVenueId <= 0) {
        const error = new Error("Invalid venue id")
        error.statusCode = 400
        throw error
    }

    const existingVenue = await Venue.findByPk(parsedVenueId)
    
    if (!existingVenue) {
        const error = new Error("Venue not found")
        error.statusCode = 404
        throw error
    }

    const finalName = updateData.name !== undefined ? updateData.name.toLowerCase() : existingVenue.name
    const finalLocation = updateData.location !== undefined ? updateData.location.toLowerCase() : existingVenue.location

    if (updateData.name !== undefined || updateData.location !== undefined) {
        const duplicateVenue = await Venue.findOne({
            where: {
                name: finalName,
                location: finalLocation,
                id: {[Op.ne]: parsedVenueId}
            }
        })

        if (duplicateVenue) {
            const error = new Error("Venue already exists at this location")
            error.statusCode = 409
            throw error
        }
    }

    if (updateData.capacity !== undefined) {
        if (updateData.capacity < existingVenue.capacity) {
            const error = new Error("Capacity cannot be reduced below current capacity")
            error.statusCode = 400
            throw error
        }
    }

    await existingVenue.update({
        name: finalName,
        location: finalLocation,
        capacity: updateData.capacity !== undefined ? updateData.capacity : existingVenue.capacity
    })

    return {
        id: existingVenue.id,
        name: existingVenue.name,
        location: existingVenue.location,
        capacity: existingVenue.capacity
    }
}

async function deleteVenue(venueId) {
    const parsedVenueId = Number(venueId)
    if (Number.isNaN(parsedVenueId) || parsedVenueId <= 0) {
        const error = new Error("Invalid venue id")
        error.statusCode = 400
        throw error
    }

    const existingVenue = await Venue.findByPk(parsedVenueId) 

    if (!existingVenue) {
        const error = new Error("Venue not found")
        error.statusCode = 404
        throw error
    }

    await existingVenue.destroy()

    return {
        message: "Venue deleted successfully"
    }
}

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue
}