const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventControler");
const { protect } = require("../middlewares/auth");

router.get("/", eventController.getEvents);
router.post("/", protect, eventController.createEvent);
router.put("/:id", protect, eventController.updateEvent);
router.delete("/:id", protect, eventController.deleteEvent);
router.get("/:id", eventController.getEventById);

module.exports = router;