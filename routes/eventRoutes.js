const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventControler");
const { protect } = require("../middlewares/auth");

router.get("/", eventController.getEvents);
router.post("/", eventController.createEvent);
router.put("/:id", eventController.updateEvent);
router.delete("/:id", eventController.deleteEvent);
router.get("/:id", eventController.getEventById);

module.exports = router;