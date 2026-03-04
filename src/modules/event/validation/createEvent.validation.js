const { parse } = require("dotenv")

function validateCreateEventData(data) {
    const {title, description, eventDate, price, totalSeats, venueId} = data

    if (title === undefined || description === undefined || eventDate === undefined || price === undefined || totalSeats === undefined || venueId === undefined) {
        const error = new Error("All fields are required")
        error.statusCode = 400
        throw error
    }

    if (typeof(title) !== "string" || typeof(description) !== "string") {
        const error = new Error("Title and description must be non-empty string")
        error.statusCode = 400
        throw error
    }

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle || !trimmedDescription) {
        const error = new Error("Title and description must be non-empty string")
        error.statusCode = 400
        throw error
    }

    if (trimmedTitle.length > 255) {
        const error = new Error("Title must not exceed more than 255 characters")
        error.statusCode = 400
        throw error
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/

    if (!dateRegex.test(eventDate)) {
        const error = new Error("Event date must be in YYYY-MM-DD format")
        error.statusCode = 400
        throw error
    }

    const parsedDate = new Date(eventDate);
    if (isNaN(parsedDate.getTime())) {
        const error = new Error("Invalid event date")
        error.statusCode = 400
        throw error
    }

    const today = new Date().toISOString().split("T")[0];

    if (eventDate < today) {
        const error = new Error("Event date cannot be in the past")
        error.statusCode = 400
        throw error
    }

    if (typeof(price) === "boolean") {
        const error = new Error("Price must be valid number")
        error.statusCode = 400
        throw error
    }

    const parsedPrice = Number(price)
    if (Number.isNaN(parsedPrice)) {
        const error = new Error("Price must be valid number")
        error.statusCode = 400
        throw error
    }

    if (parsedPrice < 0) {
        const error = new Error("Price must be greater than or equal to 0")
        error.statusCode = 400
        throw error
    }

    if (parsedPrice > 100000) {
        const error = new Error("Price exceeds maximum limit")
        error.statusCode = 400
        throw error
    }

    if (typeof(totalSeats) === "boolean") {
        const error = new Error("Total seats must be valid number")
        error.statusCode = 400
        throw error
    }

    const parsedTotalSeats = Number(totalSeats)
    if (Number.isNaN(parsedTotalSeats)) {
        const error = new Error("Total seats must be valid number")
        error.statusCode = 400
        throw error
    }

    if (parsedTotalSeats <= 0) {
        const error = new Error("Total seats must be valid positive number")
        error.statusCode = 400
        throw error
    }

    if (parsedTotalSeats > 100000) {
        const error = new Error("Total seats exceed maximum limit")
        error.statusCode = 400
        throw error
    }

    if (typeof(venueId) === "boolean") {
        const error = new Error("Invalid venue id")
        error.statusCode = 400
        throw error
    }

    const parsedVenueId = Number(venueId)
    if (Number.isNaN(parsedVenueId)) {
        const error = new Error("Invalid venue id")
        error.statusCode = 400
        throw error
    }

    if (parsedVenueId <= 0) {
        const error = new Error("Venue id must be greater than 0")
        error.statusCode = 400
        throw error
    }

    return {
        title: trimmedTitle,
        description: trimmedDescription,
        eventDate,
        price: parsedPrice,
        totalSeats: parsedTotalSeats,
        venueId: parsedVenueId
    }
}

module.exports = validateCreateEventData