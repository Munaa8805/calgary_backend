const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", protect, restrictTo("admin"), messageController.getMessages);
router.post("/", messageController.createMessage);
router.put("/:id", protect, restrictTo("admin"), messageController.updateMessage);
router.get("/:id", protect, restrictTo("admin"), messageController.getMessageById);

module.exports = router;