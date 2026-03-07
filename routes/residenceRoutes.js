const express = require("express");
const router = express.Router();
const residenceController = require("../controllers/resedinceController");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", protect, restrictTo("admin"), residenceController.getResidences);
router.post("/", residenceController.createResidence);

module.exports = router;