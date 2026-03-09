const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControler");
const { protect, restrictTo } = require("../middlewares/auth");

router.get("/", protect, userController.getUser);
router.put("/", protect, userController.updateUser);
router.delete("/", protect, restrictTo("admin"), userController.deleteUser);

module.exports = router;