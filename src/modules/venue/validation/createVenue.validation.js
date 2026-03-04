function validateCreateVenueData(data) {
    const {name, location, capacity} = data

    if (name === undefined || location === undefined || capacity === undefined) {
        const error = new Error("Name, location and capacity are required")
        error.statusCode = 400
        throw error
    }

    const trimmedName = name.trim()
    const trimmedLocation = location.trim()

    if (!trimmedName || !trimmedLocation) {
        const error = new Error("Name and location must not be empty")
        error.statusCode = 400
        throw error
    }

    if (typeof(capacity) === "boolean") {
        const error = new Error("Capacity must be valid number")
        error.statusCode = 400
        throw error
    }

    const parsedCapacity = Number(capacity)
    if (Number.isNaN(parsedCapacity)) {
        const error = new Error("Capacity must be valid number")
        error.statusCode = 400
        throw error
    }

    if (parsedCapacity <= 0) {
        const error = new Error("Capacity must be greater than 0")
        error.statusCode = 400
        throw error
    }

    if (parsedCapacity > 100000) {
        const error = new Error("Capacity exceeds allowed limit")
        error.statusCode = 400
        throw error
    }

    return {
        name: trimmedName,
        location: trimmedLocation,
        capacity: parsedCapacity
    }
}

module.exports = validateCreateVenueData