const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/User");

const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json({ success: true, user });
});

const updateUser = asyncHandler(async (req, res) => {
    const { name, phone, address, city, state, zip } = req.body;
    if (!name || !phone || !address || !city || !state || !zip) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    if (phone.length !== 10) {
        return res.status(400).json({ success: false, message: "Please enter a valid phone number" });
    }
    if (address.length < 3) {
        return res.status(400).json({ success: false, message: "Please enter a valid address" });
    }
    if (city.length < 3) {
        return res.status(400).json({ success: false, message: "Please enter a valid city" });
    }
    if (state.length < 2) {
        return res.status(400).json({ success: false, message: "Please enter a valid state" });
    }
    if (zip.length < 5) {
        return res.status(400).json({ success: false, message: "Please enter a valid zip code" });
    }

    const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address, city, state, zip }, { new: true });
    res.status(200).json({ success: true, user });
});

const deleteUser = asyncHandler(async (req, res) => {

    await User.findByIdAndDelete(req.user._id);
    res.status(200).json({ success: true, message: "User deleted successfully" });
});

module.exports = { getUser, updateUser, deleteUser };   