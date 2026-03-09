const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", volunteerController.getVolunteers);
router.get("/special", volunteerController.getSpecialVolunteers);
router.post("/:id", protect, restrictTo("admin"), volunteerController.createVolunteer);
router.delete("/:id", protect, restrictTo("admin"), volunteerController.deleteVolunteer);
router.put("/:id", protect, restrictTo("admin"), volunteerController.updateVolunteer);
module.exports = router;