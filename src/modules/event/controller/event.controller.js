const validateCreateEventData = require("../validation/createEvent.validation")
const validateUpdateEventData = require("../validation/updateEvent.validation")

const eventService = require("../service/event.service")

async function createEvent(request, response, next) {
    try {
        const data = validateCreateEventData(request.body)

        const event = await eventService.createEvent(data)

        response.status(201).json(event)
    } catch(error) {
        next(error)
    }
}

async function getAllEvents(request, response, next) {
    try {
        const events = await eventService.getAllEvents()

        response.status(200).json(events)
    } catch(error) {
        next(error)
    }
}

async function getEventById(request, response, next) {
    try {
        const {id} = request.params
        const event = await eventService.getEventById(id)

        response.status(200).json(event)
    } catch(error) {
        next(error)
    }
}

async function updateEvent(request, response, next) {
    try {
        const {id} = request.params
        const data = validateUpdateEventData(request.body)

        const event = await eventService.updateEvent(data, id)

        response.status(200).json(event)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createEvent,
    getAllEvents,
    getEventById,
    updateEvent
}