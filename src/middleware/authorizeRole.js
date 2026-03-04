function authorizeRole(...allowedRoles) {
    return function(request, response, next) {
        if (!request.user) {
            const error = new Error("Unauthorized access")
            error.statusCode = 401
            return next(error)
        }

        if (!allowedRoles.includes(request.user.role)) {
            const error = new Error("Permission denied")
            error.statusCode = 403
            return next(error)
        }
        
        next()
    }
}

module.exports = authorizeRole