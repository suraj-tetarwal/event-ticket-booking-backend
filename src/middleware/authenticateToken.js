const jwt = require("jsonwebtoken")

const authenticateToken = (request, response, next) => {
    const authHeader = request.headers["authorization"]

    if (!authHeader) {
        const error = new Error("Access token missing")
        error.statusCode = 401
        return next(error)
    }

    const jwtToken = authHeader.split(" ")[1]

    if (!jwtToken) {
        const error = new Error("Invalid JWT token")
        error.statusCode = 401
        return next(error)
    }
    
    jwt.verify(jwtToken, process.env.JWT_SECRET_KEY, (err, payload) => {
        if (err) {
            const error = new Error("Invalid or expired token")
            error.statusCode = 401
            return next(error)
        } else {
            request.user = payload
            next()
        }
    })        
}

module.exports = authenticateToken