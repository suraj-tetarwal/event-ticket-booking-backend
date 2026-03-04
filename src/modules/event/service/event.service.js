const {Op} = require("sequelize")

const Venue = require("../../../models/venue.model")
const Event = require("../../../models/event.model")

async function createEvent(data) {
    const {title, description, eventDate, price, totalSeats, venueId} = data

    const venue = await Venue.findByPk(venueId, {
        attributes: ["capacity"]
    })

    if (!venue) {
        const error = new Error("Venue not found")
        error.statusCode = 404
        throw error
    }

    if (totalSeats > venue.capacity) {
        const error = new Error("Total seats cannot exceed venue capacity")
        error.statusCode = 400
        throw error
    }

    const normalisedTitle = title.toLowerCase()
    const existingEvent = await Event.findOne({where: {
        title: normalisedTitle,
        eventDate,
        venueId
    }})

    if (existingEvent) {
        const error = new Error("An event with same title and date already exists at this venue")
        error.statusCode = 409
        throw error
    }

    const event = await Event.create({
        title: normalisedTitle,
        description,
        eventDate,
        price,
        totalSeats,
        availableSeats: totalSeats,
        venueId
    })

    return {
        id: event.id,
        title: event.title,
        description: event.description,
        eventDate: event.eventDate,
        price: event.price,
        totalSeats: event.totalSeats,
        availableSeats: event.availableSeats,
        venueId: event.venueId
    }
}

async function getAllEvents() {
    const today = new Date().toISOString().split("T")[0]

    const events = await Event.findAll({
        attributes: [
            "id",
            "title",
            "description",
            "eventDate",
            "price",
            "totalSeats",
            "availableSeats"
        ],
        where: {
            eventDate: {
                [Op.gte]: today
            }
        },
        include: [
            {
                model: Venue,
                as: "venue",
                attributes: ["name", "location"]
            }
        ],
        order: [["eventDate", "ASC"]]
    })

    return {
        count: events.length,
        events
    }
}

async function getEventById(eventId) {
    const parsedEventId = Number(eventId)

    if (Number.isNaN(parsedEventId) || parsedEventId <= 0) {
        const error = new Error("Invalid event id")
        error.statusCode = 400
        throw error
    }

    const event = await Event.findByPk(parsedEventId, {
        attributes: [
            "id",
            "title",
            "description",
            "eventDate",
            "price",
            "totalSeats",
            "availableSeats"
        ],
        include: [
            {
                model: Venue,
                as: "venue",
                attributes: ["name", "location"]
            }
        ]
    })

    if (!event) {
        const error = new Error("Event not found")
        error.statusCode = 404
        throw error
    }

    return event
}

async function updateEvent(updateData, eventId) {
    const parsedEventId = Number(eventId)
    if (Number.isNaN(parsedEventId) || parsedEventId <= 0) {
        const error = new Error("Invalid event id")
        error.statusCode = 400
        throw error
    }

    const existingEvent = await Event.findByPk(parsedEventId)

    if (!existingEvent) {
        const error = new Error("Event not found")
        error.statusCode = 404
        throw error
    }

    const finalTitle = updateData.title !== undefined ? updateData.title.toLowerCase() : existingEvent.title
    const finalDescription = updateData.description ?? existingEvent.description
    const finalEventDate = updateData.eventDate ?? existingEvent.eventDate
    const finalPrice = updateData.price ?? existingEvent.price
    const finalTotalSeats = updateData.totalSeats ?? existingEvent.totalSeats

    if (updateData.title !== undefined || updateData.eventDate !== undefined) {
        const event = await Event.findOne({where: {
            title: finalTitle,
            eventDate: finalEventDate,
            venueId: existingEvent.venueId,
            id: {[Op.ne]: parsedEventId}
        }})

        if (event) {
            const error = new Error("An event with same title and date already exists at this venue")
            error.statusCode = 409
            throw error
        }
    }

    const venue = await Venue.findByPk(existingEvent.venueId, {
        attributes: ["capacity"]
    })
    
    if (finalTotalSeats > venue.capacity) {
        const error = new Error("Total seats cannot exceed venue capacity")
        error.statusCode = 400
        throw error
    }

    const bookedSeats = existingEvent.totalSeats - existingEvent.availableSeats

    if (finalTotalSeats < bookedSeats) {
        const error = new Error("Total seats cannot be less than already booked seats")
        error.statusCode = 400
        throw error
    }

    const newAvailableSeats = finalTotalSeats - bookedSeats

    await existingEvent.update({
        title: finalTitle,
        description: finalDescription,
        eventDate: finalEventDate,
        price: finalPrice,
        totalSeats: finalTotalSeats,
        availableSeats: newAvailableSeats
    })

    return {
        id: existingEvent.id,
        title: existingEvent.title,
        description: existingEvent.description,
        eventDate: existingEvent.eventDate,
        price: existingEvent.price,
        totalSeats: existingEvent.totalSeats,
        availableSeats: existingEvent.availableSeats,
        venueId: existingEvent.venueId
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent
}