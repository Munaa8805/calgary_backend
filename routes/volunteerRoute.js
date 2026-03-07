const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", volunteerController.getVolunteers);
router.post("/", protect, restrictTo("admin"), volunteerController.createVolunteer);

module.exports = router;