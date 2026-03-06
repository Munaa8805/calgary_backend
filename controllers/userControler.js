const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
});

const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
    res.status(200).json({ success: true, user });
});

const deleteUser = asyncHandler(async (req, res) => {
    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
});

module.exports = { getUser, updateUser, deleteUser };   