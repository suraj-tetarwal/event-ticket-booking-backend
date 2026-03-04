const express = require("express")

const authRoutes = require("./modules/auth/routes/auth.routes")

const venueRoutes = require("./modules/venue/routes/venue.routes")
const eventRoutes = require("./modules/event/routes/event.routes")

const errorHandler = require("./middleware/errorHandler")

const authenticateToken = require("./middleware/authenticateToken")

const app = express()
app.use(express.json())

app.use("/api/auth", authRoutes)

app.use("/api/venues", authenticateToken, venueRoutes)
app.use("/api/events", authenticateToken, eventRoutes)

app.use(errorHandler)

module.exports = app