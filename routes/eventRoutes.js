const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventControler");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", eventController.getEvents);
router.get("/featured", eventController.getFeaturedEvents);
router.post("/", protect, eventController.createEvent);
router.put("/:id", protect, restrictTo("admin"), eventController.updateEvent);
router.delete("/:id", protect, restrictTo("admin"), eventController.deleteEvent);
router.get("/:id", eventController.getEventById);

module.exports = router;