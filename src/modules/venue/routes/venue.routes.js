const express = require("express")

const venueController = require("../controller/venue.controller")

const authorizeRole = require("../../../middleware/authorizeRole")

const router = express.Router()

router.post("/", authorizeRole("ADMIN"), venueController.createVenue)
router.get("/", authorizeRole("ADMIN"), venueController.getAllVenues)
router.get("/:id", authorizeRole("ADMIN"), venueController.getVenueById)
router.put("/:id", authorizeRole("ADMIN"), venueController.updateVenue)
router.delete("/:id", authorizeRole("ADMIN"), venueController.deleteVenue)

module.exports = router 