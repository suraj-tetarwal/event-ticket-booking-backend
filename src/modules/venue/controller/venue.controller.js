const validateCreateVenueData = require("../validation/createVenue.validation")
const validateUpdateVenueData = require("../validation/updateVenue.validation")

const venueService = require("../service/venue.service")

async function createVenue(request, response, next) {
    try {
        const data = validateCreateVenueData(request.body)

        const venue = await venueService.createVenue(data)

        response.status(201).json(venue)
    } catch(error) {
        next(error)
    }
}

async function getAllVenues(request, response, next) {
    try {
        const venues = await venueService.getAllVenues()

        response.status(200).json(venues)
    } catch(error) {
        next(error)
    }
}

async function getVenueById(request, response, next) {
    try {
        const {id} = request.params
        const venue = await venueService.getVenueById(id)

        response.status(200).json(venue)
    } catch(error) {
        next(error)
    }
}

async function updateVenue(request, response, next) {
    try {
        const {id} = request.params
        const data = validateUpdateVenueData(request.body)

        const updatedVenue = await venueService.updateVenue(data, id)

        response.status(200).json(updatedVenue)
    } catch(error) {
        next(error)
    }
}

async function deleteVenue(request, response, next) {
    try {
        const {id} = request.params
        const result = await venueService.deleteVenue(id)
    
        response.status(200).json(result)
    } catch(error) {
        next(error)
    }
}

module.exports = {
    createVenue,
    getAllVenues,
    getVenueById,
    updateVenue,
    deleteVenue
}