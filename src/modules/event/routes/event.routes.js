const express = require("express")

const eventController = require("../controller/event.controller")

const authorizeRole = require("../../../middleware/authorizeRole")

const router = express.Router()

router.post("/", authorizeRole("ADMIN"), eventController.createEvent)
router.get("/", eventController.getAllEvents)
router.get("/:id", eventController.getEventById)
router.put("/:id", authorizeRole("ADMIN"), eventController.updateEvent)

module.exports = router