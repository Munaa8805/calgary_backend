const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", volunteerController.getVolunteers);
router.post("/", protect, restrictTo("admin"), volunteerController.createVolunteer);
router.delete("/", protect, restrictTo("admin"), volunteerController.deleteVolunteer);
router.put("/", protect, restrictTo("admin"), volunteerController.updateVolunteer);
module.exports = router;