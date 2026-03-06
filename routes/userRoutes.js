const express = require("express");
const router = express.Router();
const userController = require("../controllers/userControler");
const { protect } = require("../middlewares/auth");

router.get("/", protect, userController.getUser);
router.put("/", protect, userController.updateUser);
router.delete("/", protect, userController.deleteUser);

module.exports = router;