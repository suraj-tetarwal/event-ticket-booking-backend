function validateUpdateEventData(data) {
    const {title, description, eventDate, price, totalSeats} = data

    if (title === undefined && description === undefined && eventDate === undefined && price === undefined && totalSeats === undefined) {
        const error = new Error("At least one field must be provided for update")
        error.statusCode = 400
        throw error
    }

    const updateData = {}

    if (title !== undefined) {
        if (typeof(title) !== "string") {
            const error = new Error("Title must be non-empty string")
            error.statusCode = 400
            throw error
        }

        const trimmedTitle = title.trim()
        if (!trimmedTitle) {
            const error = new Error("Title must be non-empty string")
            error.statusCode = 400
            throw error
        }

        updateData.title = trimmedTitle
    }

    if (description !== undefined) {
        if (typeof(description) !== "string") {
            const error = new Error("Description must be non-empty string")
            error.statusCode = 400
            throw error
        }

        const trimmedDescription = description.trim()
        if (!trimmedDescription) {
            const error = new Error("Description must be non-empty string")
            error.statusCode = 400
            throw error
        }

        updateData.description = trimmedDescription
    }

    if (eventDate !== undefined) {
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

        updateData.eventDate = eventDate
    }

    if (price !== undefined) {
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

        updateData.price = parsedPrice
    }

    if (totalSeats !== undefined) {
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

        updateData.totalSeats = parsedTotalSeats
    }

    return updateData
}

module.exports = validateUpdateEventData