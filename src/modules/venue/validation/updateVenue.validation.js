function validateUpdateVenueData(data) {
    const {name, location, capacity} = data

    if (name === undefined && location === undefined && capacity === undefined) {
        const error = new Error("At least one field(name, location, capacity) must be provided for update")
        error.statusCode = 400
        throw error
    }

    const updateData = {}

    if (name !== undefined) {
        if (typeof(name) !== "string") {
            const error = new Error("Name must be non-empty string")
            error.statusCode = 400
            throw error
        }

        const trimmedName = name.trim()
        
        if (!trimmedName) {
            const error = new Error("Name must be non-empty string")
            error.statusCode = 400
            throw error
        }

        updateData.name = trimmedName
    }

    if (location !== undefined) {
        if (typeof(location) !== "string") {
            const error = new Error("Location must be non-empty string")
            error.statusCode = 400
            throw error
        }
        
        const trimmedLocation = location.trim()
        
        if (!trimmedLocation) {
            const error = new Error("Location must be non-empty string")
            error.statusCode = 400
            throw error
        }

        updateData.location = trimmedLocation
    }

    let parsedCapacity
    if (capacity !== undefined) {
        if (typeof(capacity) === "boolean") {
            const error = new Error("Capacity must be valid number")
            error.statusCode = 400
            throw error
        }

        parsedCapacity = Number(capacity)
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
            const error = new Error("Capacity exceed allowed limit")
            error.statusCode = 400
            throw error
        }

        updateData.capacity = parsedCapacity
    }

    return updateData
}

module.exports = validateUpdateVenueData